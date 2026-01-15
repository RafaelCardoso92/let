export function StructuredData() {
  const baseUrl = "https://let.rafaelcardoso.co.uk";
  
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "Let'Rent",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/images/logos/logo.png`,
          width: 180,
          height: 60
        },
        sameAs: [
          "https://www.facebook.com/profile.php?id=61573953476342",
          "https://www.instagram.com/let.rent.lda"
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          availableLanguage: ["Portuguese", "English"]
        }
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Let'Rent - Aluguer de Material para Eventos",
        description: "Aluguer premium de material para eventos em Portugal. Equipamentos de catering, mobiliário de luxo, transporte e montagem profissional.",
        publisher: {
          "@id": `${baseUrl}/#organization`
        },
        inLanguage: "pt-PT",
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/servicos`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#business`,
        name: "Let'Rent",
        image: [
          `${baseUrl}/images/hero/hero-2.jpg`,
          `${baseUrl}/images/logos/logo.png`
        ],
        description: "Aluguer premium de material para eventos. Oferecemos equipamentos de catering de alta qualidade, mobiliário de luxo, cristalaria fina e serviços completos de transporte e montagem profissional.",
        url: baseUrl,
        priceRange: "€€",
        address: {
          "@type": "PostalAddress",
          addressCountry: "PT",
          addressRegion: "Portugal"
        },
        areaServed: {
          "@type": "Country",
          name: "Portugal"
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday"],
            opens: "09:00",
            closes: "13:00"
          }
        ],
        sameAs: [
          "https://www.facebook.com/profile.php?id=61573953476342",
          "https://www.instagram.com/let.rent.lda"
        ]
      },
      {
        "@type": "Service",
        "@id": `${baseUrl}/#service`,
        serviceType: "Aluguer de Material para Eventos",
        provider: {
          "@id": `${baseUrl}/#organization`
        },
        areaServed: {
          "@type": "Country",
          name: "Portugal"
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Catálogo de Material para Eventos",
          itemListElement: [
            {
              "@type": "OfferCatalog",
              name: "Equipamentos de Mesa",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Pratos Marcadores",
                    description: "Pratos marcadores em dourado, preto e outras cores"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Talheres Premium",
                    description: "Talheres de alta qualidade para eventos sofisticados"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Cristalaria",
                    description: "Copos de cristal e taças para todas as ocasiões"
                  }
                }
              ]
            },
            {
              "@type": "OfferCatalog",
              name: "Mobiliário",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Cadeiras Tiffany",
                    description: "Cadeiras Tiffany elegantes para casamentos e eventos"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Mesas",
                    description: "Mesas rústicas, bistrô e de diversos estilos"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Lounge",
                    description: "Sofás e puffs para áreas de descanso"
                  }
                }
              ]
            }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Serviços",
            item: `${baseUrl}/servicos`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Contactos",
            item: `${baseUrl}/contactos`
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
