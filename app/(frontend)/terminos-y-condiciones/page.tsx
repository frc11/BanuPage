import { Metadata } from 'next';
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern';
import { SectionDivider } from '@/src/components/ui/section-divider';

export const metadata: Metadata = {
  title: 'T\u00e9rminos y Condiciones | Ban\u016b Scents',
  description:
    'Le\u00e9 los t\u00e9rminos y condiciones de compra, env\u00edos y devoluciones de Ban\u016b Scents.',
};

const TERMS_ITEMS = [
  {
    title: 'Alcance',
    body: 'Al navegar y comprar en Ban\u016b Scents acept\u00e1s estos t\u00e9rminos. Toda compra queda sujeta a disponibilidad de stock y confirmaci\u00f3n del pago.',
  },
  {
    title: 'Precios y pagos',
    body: 'Los precios publicados est\u00e1n en pesos argentinos. Podemos actualizar valores, promociones y condiciones sin previo aviso.',
  },
  {
    title: 'Env\u00edos',
    body: 'Realizamos env\u00edos a todo el pa\u00eds. Los tiempos y costos pueden variar seg\u00fan destino, operador log\u00edstico y \u00e9poca del a\u00f1o.',
  },
  {
    title: 'Cambios y devoluciones',
    body: 'Si necesit\u00e1s gestionar una devoluci\u00f3n, escribinos por WhatsApp con tu n\u00famero de pedido, producto y motivo para evaluar el caso.',
  },
  {
    title: 'Disponibilidad',
    body: 'Trabajamos con partidas limitadas de perfumes importados. El stock visible puede cambiar r\u00e1pidamente por alta demanda.',
  },
  {
    title: 'Atenci\u00f3n al cliente',
    body: 'Nuestro canal principal de atenci\u00f3n es WhatsApp. Te asesoramos de forma personalizada para compras, devoluciones y seguimiento.',
  },
] as const;

const RETURNS_WHATSAPP =
  'https://wa.me/5493814665503?text=Hola%20Banu%2C%20necesito%20ayuda%20con%20una%20devolucion.%0A%0A1%29%20Numero%20de%20pedido%3A%0A2%29%20Producto%20que%20queres%20devolver%3A%0A3%29%20Motivo%20de%20la%20devolucion%3A%0A4%29%20Estado%20actual%20del%20producto%3A%0A5%29%20Fecha%20de%20compra%3A';

export default function TerminosYCondicionesPage() {
  return (
    <>
      <section
        style={{
          background: 'var(--color-dark)',
          paddingTop: 'calc(var(--navbar-height) + 5rem)',
          paddingBottom: '5rem',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        >
          <ArabicPatternOverlay opacity={0.03} color="light" />
        </div>

        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--color-gold)',
            opacity: 0.7,
            marginBottom: '1.25rem',
            position: 'relative',
          }}
        >
          {'Informaci\u00f3n legal'}
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2.8rem, 7vw, 5.8rem)',
            fontWeight: 300,
            color: 'var(--color-cream)',
            letterSpacing: '0.04em',
            marginBottom: '1.25rem',
            position: 'relative',
            textAlign: 'center',
          }}
        >
          {'T\u00e9rminos y Condiciones'}
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.8rem',
            color: 'var(--color-cream)',
            opacity: 0.45,
            maxWidth: '540px',
            margin: '0 auto',
            lineHeight: 1.7,
            position: 'relative',
          }}
        >
          {'Condiciones de compra, env\u00edos y atenci\u00f3n para operar con transparencia y seguridad.'}
        </p>
      </section>

      <SectionDivider variant="pattern" from="dark" to="cream" />

      <section
        style={{
          background: 'var(--color-cream)',
          color: 'var(--color-text)',
          paddingTop: 'clamp(3rem, 6vw, 5rem)',
          paddingBottom: 'clamp(4rem, 7vw, 6rem)',
        }}
      >
        <div
          style={{
            maxWidth: '980px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              opacity: 0.9,
              marginBottom: '2rem',
            }}
          >
            {'\u00daltima actualizaci\u00f3n: 25 de abril de 2026'}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'clamp(1.2rem, 2vw, 2rem)',
            }}
          >
            {TERMS_ITEMS.map((item) => (
              <article
                key={item.title}
                style={{
                  border: '1px solid rgba(44,24,16,0.14)',
                  padding: 'clamp(1.1rem, 1.8vw, 1.5rem)',
                  background: 'rgba(255,255,255,0.35)',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '1.45rem',
                    color: 'var(--color-dark)',
                    marginBottom: '0.65rem',
                    letterSpacing: '0.02em',
                    fontWeight: 600,
                  }}
                >
                  {item.title}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.92rem',
                    color: 'rgba(44,24,16,0.82)',
                    lineHeight: 1.7,
                  }}
                >
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <div
            style={{
              marginTop: '2.5rem',
              border: '1px solid rgba(139,115,85,0.38)',
              padding: 'clamp(1.2rem, 2vw, 1.8rem)',
              background: 'rgba(139,115,85,0.08)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.94rem',
                lineHeight: 1.7,
                color: 'rgba(44,24,16,0.88)',
                marginBottom: '1rem',
              }}
            >
              {'Para gestionar devoluciones, te pedimos usar nuestro formulario r\u00e1pido por WhatsApp.'}
            </p>

            <a
              href={RETURNS_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: 'var(--color-cream)',
                background: 'var(--color-dark)',
                border: '1px solid rgba(44,24,16,0.9)',
                padding: '0.72rem 1rem',
              }}
            >
              {'Iniciar devoluci\u00f3n por WhatsApp'}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
