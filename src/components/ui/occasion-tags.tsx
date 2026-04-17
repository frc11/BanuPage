import { Sun, Snowflake, Coffee, Moon, Heart, Zap, Wind, Sparkles, LucideIcon } from 'lucide-react'

interface OccasionTagsProps {
  tags?: string[]
  theme?: 'light' | 'dark'
}

const tagIcons: Record<string, LucideIcon> = {
  'Calor':       Sun,
  'Frío':        Snowflake,
  'Diario':      Coffee,
  'Noche':       Moon,
  'Cita':        Heart,
  'Modo Bestia': Zap,
  'Sport':       Wind,
  'Elegante':    Sparkles
}

export default function OccasionTags({ tags, theme = 'dark' }: OccasionTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
      <p style={{
        fontFamily: 'var(--font-dm-sans), sans-serif',
        fontSize: '0.6rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: theme === 'dark' ? 'var(--color-cream)' : 'var(--color-dark)',
        opacity: 0.4,
        marginBottom: '0.875rem'
      }}>
        Ocasión
      </p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {tags.map(tag => {
          const Icon = tagIcons[tag]
          const isBeast = tag.toUpperCase() === 'MODO BESTIA';
          return (
            <div key={tag} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.375rem 0.75rem',
              border: '1px solid',
              borderColor: theme === 'dark' 
                ? 'rgba(234,230,223,0.15)' 
                : 'rgba(44,24,16,0.12)',
            }}>
              {Icon && (
                <Icon 
                  size={10} 
                  color={isBeast ? 'var(--color-dark)' : 'var(--color-gold)'}
                  strokeWidth={1.5}
                />
              )}
              <span style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: theme === 'dark' ? 'var(--color-cream)' : 'var(--color-dark)',
                opacity: 0.7
              }}>
                {tag}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
