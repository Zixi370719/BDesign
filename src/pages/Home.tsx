import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { Button } from '../components'
import './Home.css'

export default function Home() {
  const { t } = useLanguage()

  const features = [
    {
      icon: '🏛️',
      title: t('home.features.comprehensive.title'),
      description: t('home.features.comprehensive.description'),
    },
    {
      icon: '🌐',
      title: t('home.features.components.title'),
      description: t('home.features.components.description'),
    },
    {
      icon: '⚙️',
      title: t('home.features.accessible.title'),
      description: t('home.features.accessible.description'),
    },
    {
      icon: '❤️',
      title: t('home.features.customizable.title'),
      description: t('home.features.customizable.description'),
    },
  ]

  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-hero-container">
          <motion.div
            className="home-hero-content"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="home-hero-badge">BDesign</div>
            <h1 className="home-hero-title">{t('home.hero.title')}</h1>
            <p className="home-hero-subtitle">{t('home.hero.subtitle')}</p>
            <div className="home-hero-description">
              {t('home.hero.description').split('\n\n').map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>

            <div className="home-hero-actions">
              <Link to="/components">
                <Button variant="primary" size="large">{t('home.hero.getStarted')}</Button>
              </Link>
              <Link to="/design">
                <Button variant="outline" size="large">{t('home.hero.viewDocs')}</Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="home-hero-visual"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="home-visual-grid">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  className="home-visual-card"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.06 * i }}
                  whileHover={{ y: -4 }}
                >
                  <div className="home-visual-card-header" />
                  <div className="home-visual-card-body">
                    <div className="home-visual-line" />
                    <div className="home-visual-line short" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-container">
          <motion.div
            className="home-section-header"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="home-section-title">{t('home.features.title')}</h2>
            <p className="home-section-subtitle">
            {t('home.features.subtitle')}
            </p>
          </motion.div>

          <div className="home-features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="home-feature-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                whileHover={{ y: -2 }}
              >
                <div className="home-feature-icon">{feature.icon}</div>
                <h3 className="home-feature-title" dangerouslySetInnerHTML={{ __html: feature.title }} />
                <p className="home-feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="home-cta-container">
          <motion.div
            className="home-cta-content"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="home-cta-title">{t('home.cta.title')}</h2>
            <p className="home-cta-description">{t('home.cta.description')}</p>
            <Link to="/components">
              <Button variant="primary" size="large">{t('home.hero.getStarted')}</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
