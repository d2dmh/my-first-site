import { useEffect, useState } from 'react'
import portraitUrl from './assets/zheng-huiru.jpg'
import BorderGlow from './components/BorderGlow.jsx'
import LineSidebar from './components/LineSidebar.jsx'
import LineWaves from './components/LineWaves.jsx'
import ShinyText from './components/ShinyText.jsx'

const sectionIds = ['home', 'profile', 'projects', 'experience', 'capabilities', 'contact']
const sidebarItems = ['首页', '个人简介', '项目校园', '工作经历', '个人能力', '联系方式']

const contact = {
  phone: '17350217554',
  email: '1805273404@qq.com',
}

const workExperience = {
  company: '厦门家禾科技有限公司',
  role: '财务专员兼行政助理',
  date: '2025.10 — 2026.05',
  details: [
    '负责税务系统发票开具与整理、进项发票登记归档，每月处理约100张发票，保证票据台账与档案可追溯。',
    '承担订单付款制单、银行流水核对、客户订单对账单制作、报销资料整理，每月处理约30笔报销及对账相关事务。',
    '管理考勤并制作工资表，维护6名员工基础数据；同步负责合同、客户订单、销售单、送货单等资料归档。',
    '协助采购办公用品、跨部门沟通与银行/税务外勤事务，包括出口外汇入账、首笔税务核查等流程办理。',
    '调研金蝶、用友等系统及订单管理方式，结合6人科贸公司业务规模评估适配性，提出以Excel台账和规范化归档为主的轻量化管理方案。',
  ],
}

const internship = {
  company: '福建省漳州市诏安县溪南十寨幼儿园',
  role: '实习教师 / 班级助理',
  date: '2025.02 — 2025.04',
  details: [
    '协助晨间接待、晨检、进餐午睡管理、卫生安全与离园记录，参与家长日常沟通与班级秩序维护。',
    '观摩语言、数学、艺术、科学、健康等教学活动；独立设计并组织3次教学活动，课后完成反思与改进。',
    '参与幼儿观察记录、家长会与亲子活动协助，提升活动执行、沟通协调和突发情况处理能力。',
  ],
}

const projects = [
  {
    date: '课程项目',
    title: '漳州“三馆”博物馆研学课程设计',
    role: '课程组长',
    details: [
      '围绕漳州三馆设计研学课程，负责小组任务拆解、资料收集、PPT制作与成果整合；3人小组成果被老师选为唯一展示作品。',
    ],
    index: '01',
  },
  {
    date: '2022 — 2023',
    title: '校友服务中心信息技术部',
    role: '副部长',
    details: [
      '对接老师完成部门宣传与活动支持，使用PS制作节日宣传海报并用于公众号宣传；多次培训干事进行PS基础实操。',
    ],
    index: '02',
  },
  {
    date: '2021 — 2023',
    title: '学习委员',
    role: '班级学习事务与信息整理',
    details: [
      '连续两学年担任学习委员，负责课程通知、资料整理、学习信息收集与同学沟通，提升信息汇总和执行推进能力。',
    ],
    index: '03',
  },
]

const capabilities = [
  {
    index: '01',
    title: '办公与数据',
    text: '熟练使用Word、Excel、PPT、WPS；可完成台账维护、数据统计、报表整理、PPT展示与基础图表制作。',
    summary: '熟练使用Word、Excel、PPT、WPS；可完成台账维护、数据统计、报表整理。',
    tags: ['Word', 'Excel', 'PPT', 'WPS'],
  },
  {
    index: '02',
    title: '设计与宣传',
    text: '掌握PS基础操作，可完成活动海报、公众号宣传图和培训材料制作。',
    summary: '掌握PS基础操作，可完成活动海报、公众号宣传图和培训材料制作。',
    tags: ['PS', '活动海报', '公众号宣传图'],
  },
  {
    index: '03',
    title: 'AI赋能办公',
    text: '熟悉使用Claude、Cursor等智能工具开展资料检索归纳、文案生成与优化、信息结构化整理、方案框架搭建及任务拆解，能够提升日常办公、活动策划与协同沟通效率。',
    summary: '熟悉使用Claude、Cursor等智能工具开展资料检索归纳、文案生成与优化、信息结构化整理。',
    tags: ['Claude', 'Cursor', '信息结构化'],
  },
  {
    index: '04',
    title: '沟通与执行',
    text: '沟通主动、执行稳定，能承担资料整理、流程跟进、跨部门协作与现场活动支持。',
    summary: '沟通主动、执行稳定，能承担资料整理、流程跟进、跨部门协作与现场活动支持。',
    tags: ['流程跟进', '跨部门协作', '现场支持'],
  },
  {
    index: '05',
    title: '专业背景',
    text: '旅游管理专业背景扎实，兼具文旅研学课程设计、校园组织宣传、幼儿园实习和企业财务行政经验，适合文旅运营、研学执行、人事行政、商务支持等岗位。',
    summary: '旅游管理专业背景扎实，兼具文旅研学课程设计、校园组织宣传、幼儿园实习和企业财务行政经验。',
    tags: ['文旅运营', '研学执行', '人事行政'],
  },
]

const certificates = [
  'CET-6',
  'CET-4',
  '四级口语B',
  '计算机二级',
  '普通话二级甲等',
  '导游资格证',
  'C2驾驶证',
]

const glowCardProps = {
  edgeSensitivity: 18,
  glowColor: '42 68 62',
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
          <ShinyText
            text={title}
            speed={3.4}
            delay={0.7}
            color="#efe3d1"
            shineColor="#d8b45f"
            spread={124}
            yoyo
            pauseOnHover
            className="shiny-section-title"
          />
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const readingLine = window.scrollY + window.innerHeight * 0.42
      let nextSection = 0

      sectionIds.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId)
        if (section && section.offsetTop <= readingLine) nextSection = index
      })
      setActiveSection(nextSection)
    }
    const onPointerMove = (event) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`)
    }
    const onPointerOver = (event) => {
      if (event.target.closest('a, button, .project-card, .capability-row')) {
        document.body.classList.add('is-hovering')
      }
    }
    const onPointerOut = (event) => {
      if (
        event.target.closest('a, button, .project-card, .capability-row') &&
        !event.relatedTarget?.closest?.('a, button, .project-card, .capability-row')
      ) {
        document.body.classList.remove('is-hovering')
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onPointerMove, { passive: true })
    document.addEventListener('mouseover', onPointerOver)
    document.addEventListener('mouseout', onPointerOut)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    const initialSection = window.location.hash.replace('#', '')
    if (initialSection) {
      requestAnimationFrame(() => {
        document.getElementById(initialSection)?.scrollIntoView({ block: 'start' })
      })
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onPointerMove)
      document.removeEventListener('mouseover', onPointerOver)
      document.removeEventListener('mouseout', onPointerOut)
      observer.disconnect()
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
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
          enableMouseInteraction
          mouseInfluence={1.15}
        />
      </div>
      <div className="cursor-glow" aria-hidden="true" />

      <aside className="resume-sidebar" aria-label="简历章节快速导航">
        <LineSidebar
          items={sidebarItems}
          accentColor="#d8b45f"
          textColor="#b9aba0"
          markerColor="#6d3b36"
          proximityRadius={118}
          maxShift={8}
          markerLength={32}
          markerGap={0}
          tickScale={0.42}
          itemGap={17}
          fontSize={0.9}
          smoothing={130}
          activeIndex={activeSection}
          indices={['00', '01', '02', '03', '04', '05']}
          onItemClick={(index) => {
            document.getElementById(sectionIds[index])?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }}
        />
      </aside>

      <header className="site-header">
        <nav className={menuOpen ? 'is-open' : ''} aria-label="主导航">
          <a href="#profile" onClick={closeMenu}>个人简介</a>
          <a href="#projects" onClick={closeMenu}>项目与校园</a>
          <a href="#experience" onClick={closeMenu}>工作经历</a>
          <a href="#capabilities" onClick={closeMenu}>个人能力</a>
        </nav>

        <a className="header-contact" href="#contact">
          联系方式
          <ArrowIcon />
        </a>

        <button
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          type="button"
          aria-label="切换导航"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid container">
            <div className="hero-copy">
              <p className="hero-kicker reveal">旅游运营 / 产品策划 / 人事行政</p>
              <h1 className="reveal">
                <span>郑</span>
                <span>慧茹</span>
              </h1>
              <p className="hero-summary reveal">
                旅游管理专业背景扎实，兼具文旅研学课程设计、校园组织宣传、幼儿园实习和企业财务行政经验，适合文旅运营、研学执行、人事行政、商务支持等岗位。
              </p>

              <div className="hero-actions reveal">
                <a className="button button-dark" href="#experience">
                  查看经历
                  <ArrowIcon />
                </a>
                <a className="button button-line" href={`mailto:${contact.email}`}>
                  联系我
                </a>
              </div>

              <div className="hero-meta reveal">
                <span>中共党员</span>
                <span>2025届本科</span>
                <span>闽南师范大学</span>
              </div>
            </div>

            <div className="portrait-column reveal">
              <div className="portrait-frame">
                <div className="portrait-grid" aria-hidden="true" />
                <img src={portraitUrl} alt="郑慧茹" />
                <div className="portrait-corner corner-top" aria-hidden="true" />
                <div className="portrait-corner corner-bottom" aria-hidden="true" />
                <p className="portrait-role">旅游管理 本科</p>
              </div>
              <div className="portrait-number" aria-hidden="true">01</div>
            </div>
          </div>

          <a className="scroll-cue" href="#profile" aria-label="前往个人简介">
            <span />
            向下浏览
          </a>
        </section>

        <section className="profile section container" id="profile">
          <SectionTitle
            index="01"
            title="个人简介"
            intro="教育背景、技能证书和关键数据"
          />

          <div className="profile-layout">
            <article className="education-card reveal">
              <div className="card-label">教育背景</div>
              <div className="education-main">
                <div>
                  <h3>闽南师范大学</h3>
                  <p>商学院｜旅游管理 本科</p>
                </div>
                <time>2021.09 — 2025.06</time>
              </div>
              <DetailList
                items={[
                  'GPA：3.9/5.0，专业排名第4；主修：旅游策划、市场营销、酒店管理、管理沟通、管理信息系统等。',
                  '荣誉：国家励志奖学金、优秀毕业生、专业二等奖学金3次、综合奖学金3次。',
                  '毕业论文：基于“第三空间”理论的新时代乡村地域休闲空间体系构建——以闽南地区为例。',
                ]}
              />
            </article>

            <aside className="profile-side">
              <div className="metric-row reveal">
                <div>
                  <strong>3.9<small>/5.0</small></strong>
                  <span>GPA</span>
                </div>
                <div>
                  <strong>第4</strong>
                  <span>专业排名</span>
                </div>
                <div>
                  <strong>3次</strong>
                  <span>专业二等奖学金</span>
                </div>
              </div>

              <div className="certificate-card reveal">
                <div className="card-label">技能证书</div>
                <div className="certificate-grid">
                  {certificates.map((certificate) => (
                    <span key={certificate}>{certificate}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="experience section" id="experience">
          <div className="container">
            <SectionTitle
              index="03"
              title="工作经历"
              intro="财务行政、流程跟进与现场协作"
            />

            <div className="experience-stack">
              <BorderGlow
                {...glowCardProps}
                className="experience-glow reveal"
                animated
              >
                <article className="experience-card primary">
                  <div className="experience-line" aria-hidden="true">
                    <span />
                  </div>
                  <div className="experience-head">
                    <span className="experience-type">实习经历</span>
                    <div>
                      <p>{internship.role}</p>
                      <h3>{internship.company}</h3>
                    </div>
                    <time>{internship.date}</time>
                  </div>
                  <DetailList items={internship.details.slice(0, 2)} />
                </article>
              </BorderGlow>

              <BorderGlow {...glowCardProps} className="experience-glow reveal">
                <article className="experience-card">
                  <div className="experience-line" aria-hidden="true">
                    <span />
                  </div>
                  <div className="experience-head">
                    <span className="experience-type">工作经历</span>
                    <div>
                      <p>{workExperience.role}</p>
                      <h3>{workExperience.company}</h3>
                    </div>
                    <time>{workExperience.date}</time>
                  </div>
                  <DetailList items={workExperience.details.slice(0, 2)} />
                </article>
              </BorderGlow>
            </div>
          </div>
        </section>

        <section className="projects section container" id="projects">
          <SectionTitle
            index="02"
            title="项目与校园经历"
            intro="研学课程设计、校友服务和班级学习事务"
          />

          <div className="project-grid">
            {projects.map((project, projectIndex) => (
              <BorderGlow
                {...glowCardProps}
                className="project-glow reveal"
                key={project.title}
                style={{ '--delay': `${projectIndex * 90}ms` }}
              >
                <article className="project-card">
                  <div className="project-top">
                    <span>{project.index}</span>
                    <time>{project.date}</time>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-role">{project.role}</p>
                  <DetailList items={project.details.slice(0, 2)} />
                </article>
              </BorderGlow>
            ))}
          </div>
        </section>

        <section className="capabilities section" id="capabilities">
          <div className="container">
            <SectionTitle
              index="04"
              title="个人能力"
              intro="办公软件、数据整理、设计宣传、AI工具、沟通执行"
            />

            <div className="capability-list">
              {capabilities.map((capability, capabilityIndex) => (
                <BorderGlow
                  {...glowCardProps}
                  className="capability-glow reveal"
                  key={capability.title}
                  animated={capabilityIndex === 0}
                >
                  <article className="capability-row">
                    <span className="capability-index">{capability.index}</span>
                    <h3>{capability.title}</h3>
                    <p>{capability.summary}</p>
                    <div className="capability-tags">
                      {capability.tags.slice(0, capabilityIndex === 0 ? 3 : 2).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </article>
                </BorderGlow>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-grid container">
            <div className="contact-heading reveal">
              <p className="section-index">05</p>
              <h2>
                <ShinyText
                  text="联系方式"
                  speed={3.4}
                  delay={0.7}
                  color="#efe3d1"
                  shineColor="#d8b45f"
                  spread={124}
                  yoyo
                  pauseOnHover
                  className="shiny-section-title"
                />
              </h2>
              <p>沟通主动、执行稳定，能承担资料整理、流程跟进、跨部门协作与现场活动支持。</p>
            </div>

            <div className="contact-links reveal">
              <a href={`tel:${contact.phone}`}>
                <span>电话</span>
                <strong>{contact.phone}</strong>
                <ArrowIcon />
              </a>
              <a href={`mailto:${contact.email}`}>
                <span>邮箱</span>
                <strong>{contact.email}</strong>
                <ArrowIcon />
              </a>
            </div>

          </div>
        </section>
      </main>
    </div>
  )
}

export default App
