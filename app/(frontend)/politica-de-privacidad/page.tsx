import { Metadata } from 'next';
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern';
import { SectionDivider } from '@/src/components/ui/section-divider';

export const metadata: Metadata = {
  title: 'Pol\u00edtica de Privacidad | Ban\u016b Scents',
  description:
    'Conoc\u00e9 c\u00f3mo Ban\u016b Scents recopila, usa y protege tu informaci\u00f3n personal.',
};

const PRIVACY_ITEMS = [
  {
    title: 'Datos que recopilamos',
    body: 'Podemos recopilar datos de contacto y de compra cuando te comunic\u00e1s por WhatsApp o realiz\u00e1s pedidos.',
  },
  {
    title: 'Uso de la informaci\u00f3n',
    body: 'Utilizamos tu informaci\u00f3n para responder consultas, procesar pedidos, gestionar env\u00edos y mejorar la atenci\u00f3n.',
  },
  {
    title: 'Compartir datos',
    body: 'No vendemos informaci\u00f3n personal. Solo compartimos datos con operadores log\u00edsticos o servicios necesarios para cumplir tu pedido.',
  },
  {
    title: 'Seguridad',
    body: 'Aplicamos medidas razonables para proteger la informaci\u00f3n frente a accesos no autorizados, p\u00e9rdida o uso indebido.',
  },
  {
    title: 'Tus derechos',
    body: 'Pod\u00e9s solicitar acceso, actualizaci\u00f3n o eliminaci\u00f3n de tus datos personales escribi\u00e9ndonos por WhatsApp.',
  },
  {
    title: 'Cambios de pol\u00edtica',
    body: 'Esta pol\u00edtica puede actualizarse para reflejar cambios legales o de operaci\u00f3n durante el a\u00f1o. Publicaremos siempre la versi\u00f3n vigente en esta p\u00e1gina.',
  },
] as const;

const PRIVACY_WHATSAPP =
  'https://wa.me/5493814665503?text=Hola%20Ban%C5%AB%2C%20quiero%20hacer%20una%20consulta%20sobre%20privacidad%20de%20datos.';

export default function PoliticaDePrivacidadPage() {
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
          {'Pol\u00edtica de Privacidad'}
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.8rem',
            color: 'var(--color-cream)',
            opacity: 0.45,
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.7,
            position: 'relative',
          }}
        >
          {'Te explicamos qu\u00e9 datos usamos y c\u00f3mo los protegemos durante tu experiencia de compra.'}
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
            {PRIVACY_ITEMS.map((item) => (
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
              {'Si ten\u00e9s dudas sobre privacidad o tratamiento de datos, escribinos directamente por WhatsApp.'}
            </p>

            <a
              href={PRIVACY_WHATSAPP}
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
              Consultar por privacidad
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
