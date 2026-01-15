import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createToken, hashPassword } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { username, password, action } = await request.json();
    
    // Create initial admin user if none exists
    if (action === "setup") {
      const existingAdmin = await prisma.admin.findFirst();
      if (existingAdmin) {
        return NextResponse.json(
          { error: "Admin já existe" },
          { status: 400 }
        );
      }
      
      const passwordHash = await hashPassword(password);
      await prisma.admin.create({
        data: {
          username,
          passwordHash,
        },
      });
      
      return NextResponse.json({ success: true, message: "Admin criado" });
    }
    
    // Login
    const admin = await prisma.admin.findUnique({
      where: { username },
    });
    
    if (!admin) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }
    
    const isValid = await verifyPassword(password, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }
    
    const token = await createToken({
      userId: admin.id,
      username: admin.username,
    });
    
    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    
    return NextResponse.json({
      success: true,
      user: { username: admin.username },
    });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Erro de autenticação" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("admin_token");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao fazer logout" },
      { status: 500 }
    );
  }
}
