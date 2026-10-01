// Starter page for the Dark Luxe style. Copy next to the components/ folder,
// replace the content, delete the sections you don't need.
import BorderGlow from './components/BorderGlow.jsx'
import LineSidebar from './components/LineSidebar.jsx'
import LineWaves from './components/LineWaves.jsx'
import ShinyText from './components/ShinyText.jsx'
import usePageEffects from './usePageEffects.js'

// Keep in DOM order — the sidebar highlight depends on it.
const sections = [
  { id: 'home', label: '首页' },
  { id: 'about', label: '关于' },
  { id: 'work', label: '作品' },
  { id: 'contact', label: '联系' },
]

// Tuned for the crimson/gold palette. Re-tune colors together when re-skinning.
const glowCardProps = {
  edgeSensitivity: 18,
  glowColor: '42 68 62', // HSL of the gold edge light
  backgroundColor: '#0d0607',
  borderRadius: 12,
  glowRadius: 34,
  glowIntensity: 0.85,
  coneSpread: 22,
  colors: ['#8f151d', '#d2ad65', '#3d090d'],
  fillOpacity: 0.34,
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M14 6l6 6-6 6" />
    </svg>
  )
}

function SectionTitle({ index, title, intro }) {
  return (
    <header className="section-title reveal">
      <p className="section-index">{index}</p>
      <div>
        <h2>
          <ShinyText text={title} speed={3.4} delay={0.7} color="#efe3d1" shineColor="#d8b45f" spread={124} yoyo pauseOnHover />
        </h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
    </header>
  )
}

function DetailList({ items }) {
  return (
    <ul className="detail-list">
      {items.map((item) => (
        <li key={item}>
          <span aria-hidden="true" />
          <p>{item}</p>
        </li>
      ))}
    </ul>
  )
}

export default function App() {
  const { activeSection, scrollToSection } = usePageEffects(sections.map((s) => s.id))

  return (
    <>
      <div className="ambient-waves" aria-hidden="true">
        <LineWaves
          speed={0.22}
          innerLineCount={34}
          outerLineCount={42}
          warpIntensity={0.34}
          rotation={-32}
          edgeFadeWidth={0.08}
          colorCycleSpeed={0.32}
          brightness={0.16}
          color1="#991921"
          color2="#d0aa62"
          color3="#310408"
          mouseInfluence={1.15}
        />
      </div>
      <div className="cursor-glow" aria-hidden="true" />

      <aside className="page-sidebar" aria-label="章节导航">
        <LineSidebar
          items={sections.map((s) => s.label)}
          indices={sections.map((_, i) => String(i).padStart(2, '0'))}
          activeIndex={activeSection}
          onItemClick={scrollToSection}
          accentColor="#d8b45f"
          textColor="#b9aba0"
          markerColor="#6d3b36"
          proximityRadius={118}
          maxShift={8}
          markerLength={32}
          tickScale={0.42}
          itemGap={17}
          fontSize={0.9}
          smoothing={130}
        />
      </aside>

      <header className="site-header">
        <nav>
          {sections.slice(1).map((s) => (
            <a key={s.id} href={`#${s.id}`}>{s.label}</a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div>
              <p className="hero-kicker reveal">方向一 / 方向二 / 方向三</p>
              <h1 className="hero-title reveal">
                <span>姓</span>
                <span>名字</span>
              </h1>
              <p className="hero-summary reveal">一句话定位：你是谁、擅长什么、适合什么。</p>
              <div className="hero-actions reveal">
                <a className="button button--primary" href="#work">查看作品 <ArrowIcon /></a>
                <a className="button button--line" href="#contact">联系我</a>
              </div>
              <div className="hero-meta reveal">
                <span>标签一</span>
                <span>标签二</span>
                <span>标签三</span>
              </div>
            </div>
            <div className="reveal">
              <div className="portrait-frame">
                <div className="portrait-grid" aria-hidden="true" />
                <img src="/portrait.jpg" alt="姓名" />
                <p className="portrait-caption">一行说明</p>
              </div>
            </div>
          </div>
          <a className="scroll-cue" href="#about"><span />向下浏览</a>
        </section>

        <section className="section" id="about" data-index="01">
          <div className="container">
            <SectionTitle index="01" title="关于" intro="一句副标题" />
            <article className="card reveal">
              <div className="card-label">小标题</div>
              <h3>主标题</h3>
              <DetailList items={['要点一', '要点二']} />
            </article>
          </div>
        </section>

        <section className="section" id="work" data-index="02">
          <div className="container">
            <SectionTitle index="02" title="作品" intro="一句副标题" />
            <div className="card-grid">
              {['作品一', '作品二', '作品三'].map((title, i) => (
                <BorderGlow {...glowCardProps} key={title} animated={i === 0} className="reveal" style={{ '--delay': `${i * 90}ms` }}>
                  <article className="glow-card-body" data-hover-glow>
                    <div className="card-label">{String(i + 1).padStart(2, '0')}</div>
                    <h3>{title}</h3>
                    <DetailList items={['说明']} />
                  </article>
                </BorderGlow>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container">
            <SectionTitle index="03" title="联系方式" />
            <div className="contact-links reveal">
              <a href="mailto:you@example.com">
                <span>邮箱</span>
                <strong>you@example.com</strong>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
