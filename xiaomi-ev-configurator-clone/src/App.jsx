import { useMemo, useState } from "react";
import {
  BODY_SECTIONS,
  CALIPERS,
  COLORS,
  ICONS,
  INTERIOR_OPTIONS,
  INTERIOR_STAGE,
  INTERIORS,
  LOGO,
  MI_LOGO,
  WHEELS,
} from "./configData.js";

const BASE_PRICE = 529900;
const LIST_PRICE = 568900;
const TABS = [
  { id: "body", label: "车身" },
  { id: "wheel", label: "车轮" },
  { id: "interior", label: "内饰" },
];

const formatPrice = (price) => `¥${price.toLocaleString("zh-CN")}`;

function PremiumMark() {
  return (
    <img
      className="premium-mark"
      src="/vendor-original/image/8d4fafcaabb5d845_custom-logo.png"
      alt="高级定制"
    />
  );
}

function LayeredPaint({ item }) {
  return (
    <span className="layered-paint" aria-hidden="true">
      <img src={item.background} alt="" />
      <img src={item.foreground} alt="" />
    </span>
  );
}

function ProductCard({
  item,
  selected,
  onSelect,
  variant = "landscape",
  disabled = false,
}) {
  return (
    <button
      type="button"
      className={`product-card product-card--${variant} ${selected ? "is-selected" : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
      disabled={disabled}
    >
      <span className="product-card__visual">
        {item.background && item.foreground ? (
          <LayeredPaint item={item} />
        ) : (
          <img src={item.image} alt="" />
        )}
        <span className="product-card__border" />
      </span>
      <span className="product-card__copy">
        <span className="product-card__name">{item.name}</span>
        {item.description ? (
          <span className="product-card__description">{item.description}</span>
        ) : null}
        {item.subline ? (
          <span className="product-card__description">{item.subline}</span>
        ) : null}
        <span className="product-card__price">
          {item.included ? "权益赠送 · 已包含" : formatPrice(item.price)}
          {item.premium ? <PremiumMark /> : null}
        </span>
      </span>
    </button>
  );
}

function Section({ title, action, children }) {
  return (
    <section className="config-section">
      <div className="config-section__heading">
        <h2>{title}</h2>
        {action ? <span>{action}</span> : null}
      </div>
      {children}
    </section>
  );
}

function StageButton({ icon, label, onClick, active = false }) {
  return (
    <button
      type="button"
      className={`stage-icon-button ${active ? "is-active" : ""}`}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      <img src={icon} alt="" />
    </button>
  );
}

function Stage({
  tab,
  activeColor,
  activeInterior,
  mode,
  setMode,
  viewIndex,
  setViewIndex,
  doorOpen,
  setDoorOpen,
  runtimeNote,
  setRuntimeNote,
}) {
  const [viewsExpanded, setViewsExpanded] = useState(true);

  const stageImage =
    tab === "interior"
      ? INTERIOR_STAGE
      : `/vehicle-renders/${activeColor.id}/${
          viewIndex === 0 ? "stage-4096.jpg" : `view-${viewIndex + 1}.png`
        }`;

  const resetStage = () => {
    setViewIndex(0);
    setDoorOpen(false);
    setRuntimeNote(false);
  };

  const requestFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      setRuntimeNote(true);
    }
  };

  return (
    <section className="stage" aria-label="车辆展示舞台">
      <img className="mi-logo" src={MI_LOGO} alt="小米" />
      <p className="stage-disclaimer">
        受光线等环境影响，图片仅供参考，请以实车为准
      </p>

      <div className={`stage-media stage-media--${tab}`}>
        <img src={stageImage} alt={`${activeColor.name} SU7 Ultra 展示`} />
        {mode === "3d" ? (
          <div className={`runtime-status ${runtimeNote ? "is-visible" : ""}`}>
            <strong>3D 资源已本地化</strong>
            <span>第一阶段使用官方渲染帧，WebGL 交互运行时接入中</span>
          </div>
        ) : null}
        {doorOpen && mode === "3d" ? (
          <div className="door-status">开门动画将在 WebGL 运行时接入后启用</div>
        ) : null}
      </div>

      {tab === "interior" ? (
        <div className="interior-view-switch" aria-label="内饰视角">
          {["副驾", "主驾", "后排"].map((label, index) => (
            <button
              type="button"
              className={index === viewIndex ? "is-active" : ""}
              key={label}
              onClick={() => setViewIndex(index)}
            >
              {label}
            </button>
          ))}
        </div>
      ) : (
        <>
          <div className="stage-controls">
            <div className="mode-switch" aria-label="展示模式">
              <button
                type="button"
                className={mode === "2d" ? "is-active" : ""}
                onClick={() => {
                  setMode("2d");
                  setRuntimeNote(false);
                }}
              >
                2D
              </button>
              <span>|</span>
              <button
                type="button"
                className={mode === "3d" ? "is-active" : ""}
                onClick={() => {
                  setMode("3d");
                  setRuntimeNote(true);
                }}
              >
                3D
              </button>
            </div>
            <div className="stage-control-group">
              <StageButton icon={ICONS.reset} label="复位" onClick={resetStage} />
              {mode === "3d" ? (
                <StageButton
                  icon={ICONS.door}
                  label={doorOpen ? "关门" : "开门"}
                  active={doorOpen}
                  onClick={() => {
                    setDoorOpen((value) => !value);
                    setRuntimeNote(true);
                  }}
                />
              ) : null}
              <StageButton
                icon={ICONS.view}
                label={viewsExpanded ? "收起视角" : "展开视角"}
                active={viewsExpanded}
                onClick={() => setViewsExpanded((value) => !value)}
              />
            </div>
          </div>

          <StageButton
            icon={ICONS.fullscreen}
            label="全屏"
            onClick={requestFullscreen}
          />

          {viewsExpanded ? (
            <div className="camera-strip" aria-label="车辆视角">
              {Array.from({ length: 6 }, (_, index) => (
                <button
                  type="button"
                  key={index}
                  className={viewIndex === index ? "is-selected" : ""}
                  onClick={() => setViewIndex(index)}
                  aria-label={`视角 ${index + 1}`}
                >
                  <img
                    src={`/vehicle-renders/${activeColor.id}/view-${index + 1}.png`}
                    alt=""
                  />
                </button>
              ))}
            </div>
          ) : null}
        </>
      )}

      {tab === "interior" ? (
        <span className="active-interior-name">{activeInterior.name}</span>
      ) : null}
    </section>
  );
}

function BodyPanel({
  activeColor,
  setActiveColor,
  bodySelections,
  setBodySelections,
}) {
  const colorGroups = ["定制车漆", "标准车漆"];

  return (
    <>
      {colorGroups.map((group) => (
        <Section title={group} key={group}>
          <div className="card-grid">
            {COLORS.filter((item) => item.group === group).map((item) => (
              <ProductCard
                item={item}
                selected={item.id === activeColor.id}
                onSelect={() => setActiveColor(item)}
                key={item.id}
              />
            ))}
          </div>
        </Section>
      ))}

      {BODY_SECTIONS.map((section) => (
        <Section title={section.title} key={section.title}>
          <div className="card-grid">
            {section.items.map((item) => (
              <ProductCard
                item={item}
                selected={bodySelections[section.title] === item.id}
                onSelect={() =>
                  setBodySelections((current) => ({
                    ...current,
                    [section.title]: item.id,
                  }))
                }
                key={item.id}
              />
            ))}
          </div>
        </Section>
      ))}

      <Section title="车身选装">
        <div className="wide-option-list">
          <button type="button">
            <span>1.7㎡碳纤维车顶</span>
            <strong>{formatPrice(25000)}</strong>
          </button>
          <button type="button">
            <span>星璇迎宾灯</span>
            <strong>{formatPrice(1500)}</strong>
          </button>
          <button type="button">
            <span>碳纤维外饰套装</span>
            <strong>{formatPrice(18000)}</strong>
          </button>
        </div>
      </Section>
    </>
  );
}

function WheelPanel({
  activeWheel,
  setActiveWheel,
  activeCaliper,
  setActiveCaliper,
}) {
  return (
    <>
      {["定制轮毂", "标准轮毂"].map((group) => (
        <Section
          title={group}
          action={group === "定制轮毂" ? "不同轮毂特性对比" : undefined}
          key={group}
        >
          <div className="card-grid card-grid--square">
            {WHEELS.filter((wheel) => wheel.group === group).map((wheel) => (
              <ProductCard
                item={wheel}
                variant="square"
                selected={wheel.id === activeWheel.id}
                onSelect={() => setActiveWheel(wheel)}
                key={wheel.id}
              />
            ))}
          </div>
        </Section>
      ))}

      <Section title="轮胎">
        <div className="tire-list">
          <div>
            <strong>倍耐力® P ZERO™ 第五代高性能轮胎</strong>
            <span>续航里程（CLTC）555km · 零百加速 2.1s</span>
          </div>
          <div>
            <strong>倍耐力® P ZERO™ 第五代长续航轮胎</strong>
            <span>续航里程（CLTC）630km · 零百加速 2.3s</span>
          </div>
        </div>
      </Section>

      <Section title="卡钳">
        <div className="card-grid card-grid--square">
          {CALIPERS.map((caliper) => (
            <ProductCard
              item={caliper}
              variant="square"
              selected={caliper.id === activeCaliper.id}
              onSelect={() => setActiveCaliper(caliper)}
              key={caliper.id}
            />
          ))}
        </div>
      </Section>
    </>
  );
}

function InteriorPanel({
  activeInterior,
  setActiveInterior,
  selectedOptions,
  setSelectedOptions,
}) {
  return (
    <>
      {["定制内饰套装", "标准内饰套装"].map((group) => (
        <Section title={group} key={group}>
          <div className="card-grid">
            {INTERIORS.filter((item) => item.group === group).map((item) => (
              <ProductCard
                item={item}
                selected={item.id === activeInterior.id}
                onSelect={() => setActiveInterior(item)}
                key={item.id}
              />
            ))}
          </div>
        </Section>
      ))}

      <Section title="内饰选装">
        <div className="wide-card-list">
          {INTERIOR_OPTIONS.map((item) => {
            const selected = item.included || selectedOptions.has(item.id);
            return (
              <button
                type="button"
                className={selected ? "is-selected" : ""}
                key={item.id}
                onClick={() => {
                  if (item.included) return;
                  setSelectedOptions((current) => {
                    const next = new Set(current);
                    if (next.has(item.id)) next.delete(item.id);
                    else next.add(item.id);
                    return next;
                  });
                }}
              >
                <img src={item.image} alt="" />
                <span>
                  <strong>{item.name}</strong>
                  <small>
                    {item.included ? "权益赠送 · 已包含" : formatPrice(item.price)}
                  </small>
                </span>
              </button>
            );
          })}
        </div>
      </Section>
    </>
  );
}

export function App() {
  const [activeTab, setActiveTab] = useState("body");
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [activeWheel, setActiveWheel] = useState(WHEELS.at(-1));
  const [activeCaliper, setActiveCaliper] = useState(CALIPERS.at(-1));
  const [activeInterior, setActiveInterior] = useState(INTERIORS.at(-1));
  const [bodySelections, setBodySelections] = useState({
    前舱盖: "standard-hood",
    拉花: "no-stripe",
    徽标: "carbon-badge",
    尾翼: "electric-spoiler",
  });
  const [selectedInteriorOptions, setSelectedInteriorOptions] = useState(new Set());
  const [mode, setMode] = useState("2d");
  const [viewIndex, setViewIndex] = useState(0);
  const [doorOpen, setDoorOpen] = useState(false);
  const [runtimeNote, setRuntimeNote] = useState(false);

  const bodyPrice = useMemo(
    () =>
      BODY_SECTIONS.reduce((sum, section) => {
        const selected = section.items.find(
          (item) => item.id === bodySelections[section.title],
        );
        return sum + (selected?.price ?? 0);
      }, 0),
    [bodySelections],
  );

  const interiorOptionsPrice = useMemo(
    () =>
      INTERIOR_OPTIONS.reduce(
        (sum, item) =>
          sum +
          (!item.included && selectedInteriorOptions.has(item.id) ? item.price : 0),
        0,
      ),
    [selectedInteriorOptions],
  );

  const totalPrice =
    BASE_PRICE +
    activeColor.price +
    activeWheel.price +
    activeCaliper.price +
    activeInterior.price +
    bodyPrice +
    interiorOptionsPrice;
  const selectedPrice = totalPrice - BASE_PRICE;
  const activeIndex = TABS.findIndex((tab) => tab.id === activeTab);

  const changeTab = (tabId) => {
    setActiveTab(tabId);
    setViewIndex(0);
    setDoorOpen(false);
    setRuntimeNote(false);
  };

  return (
    <main className="app-shell">
      <Stage
        tab={activeTab}
        activeColor={activeColor}
        activeInterior={activeInterior}
        mode={mode}
        setMode={setMode}
        viewIndex={viewIndex}
        setViewIndex={setViewIndex}
        doorOpen={doorOpen}
        setDoorOpen={setDoorOpen}
        runtimeNote={runtimeNote}
        setRuntimeNote={setRuntimeNote}
      />

      <aside className="config-panel">
        <header className="panel-header">
          <img src={LOGO} alt="SU7 Ultra" />
          <nav className="config-tabs" aria-label="选配分类">
            {TABS.map((tab) => (
              <button
                type="button"
                key={tab.id}
                className={activeTab === tab.id ? "is-active" : ""}
                onClick={() => changeTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </header>

        <div className="config-scroll">
          {activeTab === "body" ? (
            <BodyPanel
              activeColor={activeColor}
              setActiveColor={setActiveColor}
              bodySelections={bodySelections}
              setBodySelections={setBodySelections}
            />
          ) : null}
          {activeTab === "wheel" ? (
            <WheelPanel
              activeWheel={activeWheel}
              setActiveWheel={setActiveWheel}
              activeCaliper={activeCaliper}
              setActiveCaliper={setActiveCaliper}
            />
          ) : null}
          {activeTab === "interior" ? (
            <InteriorPanel
              activeInterior={activeInterior}
              setActiveInterior={setActiveInterior}
              selectedOptions={selectedInteriorOptions}
              setSelectedOptions={setSelectedInteriorOptions}
            />
          ) : null}
        </div>

        <footer className="price-bar">
          <div className="price-copy">
            <div>
              <strong>{formatPrice(totalPrice)}</strong>
              <del>{formatPrice(LIST_PRICE + selectedPrice)}</del>
            </div>
            <p>
              定制服务需选配满¥60,000，已选
              {formatPrice(selectedPrice)}
            </p>
          </div>
          <div className="step-buttons">
            {activeIndex > 0 ? (
              <button
                type="button"
                className="step-button step-button--back"
                aria-label="上一步"
                onClick={() => changeTab(TABS[activeIndex - 1].id)}
              >
                <img src={ICONS.arrow} alt="" />
              </button>
            ) : null}
            <button
              type="button"
              className="step-button step-button--next"
              onClick={() => {
                if (activeIndex < TABS.length - 1) {
                  changeTab(TABS[activeIndex + 1].id);
                }
              }}
            >
              {activeIndex === TABS.length - 1 ? "总览" : TABS[activeIndex + 1].label}
              <img src={ICONS.arrow} alt="" />
            </button>
          </div>
        </footer>
      </aside>
    </main>
  );
}
