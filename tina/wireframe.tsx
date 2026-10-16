import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useCMS } from "tinacms";

/**
 * The visual editor's sidebar. Each block is a schematic of one section on
 * the page, and its text is edited in place. The panel's Save button stores
 * the changes. The preview on the right stays the real design.
 */
export type Sketch =
  | "hero"
  | "logos"
  | "industries"
  | "stats"
  | "map"
  | "academy"
  | "reasons"
  | "clips"
  | "dictionary"
  | "section";

type NodeField = {
  name: string;
  label?: string;
  type?: string;
  list?: boolean;
  options?: Array<string | { value: string; label?: string }>;
  fields?: NodeField[];
};

type WireProps = {
  field: { label?: string; name: string; list?: boolean; fields?: NodeField[] };
  input: { value: unknown; onChange: (value: unknown) => void };
  form: {
    mutators: {
      push: (name: string, value: unknown) => void;
      move: (name: string, from: number, to: number) => void;
    };
  };
  tinaForm: {
    mutators: { remove: (name: string, index: number) => void };
  };
};

const paper = "#f7f4ee";
const ink = "#1c2430";
const rule = "#c9c2b2";
const faint = "#8d8678";

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function list(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function raw(value: unknown) {
  return typeof value === "string" ? value : value == null ? "" : String(value);
}

function at(source: unknown, path: string[]): unknown {
  return path.reduce<unknown>((current, key) => {
    if (Array.isArray(current)) return current[Number(key)];
    return record(current)[key];
  }, source);
}

function writePath(source: unknown, path: string[], next: unknown): unknown {
  if (path.length === 0) return next;
  const [head, ...rest] = path;
  if (Array.isArray(source)) {
    const copy = source.slice();
    const index = Number(head);
    copy[index] = writePath(copy[index], rest, next);
    return copy;
  }
  const copy = { ...record(source) };
  copy[head] = writePath(copy[head], rest, next);
  return copy;
}

function useStyle() {
  useEffect(() => {
    const css = `
      [data-test^="form:"]:has(.handoff-wire) { background: #e4e0d6 !important; }
      [data-test^="form:"]:has(.handoff-wire) > div { background: transparent !important; }
      .handoff-wire, .handoff-wire * { white-space: normal !important; }
      .handoff-ink {
        appearance: none !important;
        background: transparent !important;
        border: 0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        color: inherit !important;
        display: block !important;
        font: inherit !important;
        height: auto !important;
        margin: 0 !important;
        min-height: 0 !important;
        outline: none !important;
        padding: 1px 0 !important;
        resize: none !important;
        width: 100% !important;
      }
      .handoff-ink:focus { box-shadow: inset 0 -1px 0 currentColor !important; }
      select.handoff-ink {
        appearance: auto !important;
        background: #fff !important;
        border: 1px solid #c9c2b2 !important;
        border-radius: 6px !important;
        color: #1c2430 !important;
        padding: 2px 4px !important;
      }
      .handoff-item { position: relative; }
      .handoff-tools {
        position: absolute; top: 4px; right: 4px; z-index: 2;
        display: flex; gap: 2px; opacity: 0;
        background: rgba(247,244,238,0.94); border: 1px solid #c9c2b2; border-radius: 999px; padding: 1px;
      }
      .handoff-item:hover .handoff-tools, .handoff-item:focus-within .handoff-tools { opacity: 1; }
      .handoff-more { margin-top: 12px; border-top: 1px dashed #c9c2b2; padding-top: 8px; }
      .handoff-more > summary { cursor: pointer; color: #8d8678; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; }
    `;
    let style = document.getElementById("handoff-wireframe-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "handoff-wireframe-style";
      document.head.appendChild(style);
    }
    style.textContent = css;
  }, []);
}

function Block({ label, dark = false, children }: { label: string; dark?: boolean; children: ReactNode }) {
  return (
    <section
      className="handoff-wire"
      style={{
        background: dark ? "#243044" : paper,
        color: dark ? "#f3f0e8" : ink,
        border: `1px solid ${dark ? "#243044" : rule}`,
        borderRadius: 14,
        padding: "14px 14px 16px",
        marginBottom: 10,
      }}
    >
      <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: dark ? "#b7c0cc" : faint, marginBottom: 10 }}>
        {label}
      </div>
      {children}
    </section>
  );
}

function Ink({
  value,
  onChange,
  placeholder,
  size = 13,
  weight = 500,
  align = "left",
  family = "inherit",
  italic = false,
  rows = 1,
}: {
  value: unknown;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: number;
  weight?: number;
  align?: CSSProperties["textAlign"];
  family?: string;
  italic?: boolean;
  rows?: number;
}) {
  const style: CSSProperties = {
    fontSize: size,
    fontWeight: weight,
    textAlign: align,
    fontFamily: family,
    fontStyle: italic ? "italic" : "normal",
    lineHeight: 1.35,
    letterSpacing: "inherit",
    textTransform: "inherit",
  };
  if (rows > 1) {
    return <textarea className="handoff-ink" rows={rows} value={raw(value)} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} style={style} />;
  }
  return <input className="handoff-ink" value={raw(value)} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} style={style} />;
}

function ItemTools({ index, total, move, remove }: { index: number; total: number; move: (from: number, to: number) => void; remove: (index: number) => void }) {
  const button = { border: 0, background: "transparent", color: ink, fontSize: 11, lineHeight: 1, padding: "3px 5px", cursor: "pointer" };
  return (
    <span className="handoff-tools">
      <button type="button" aria-label="Move earlier" disabled={index === 0} onClick={() => move(index, index - 1)} style={button}>↑</button>
      <button type="button" aria-label="Move later" disabled={index === total - 1} onClick={() => move(index, index + 1)} style={button}>↓</button>
      <button type="button" aria-label="Remove" onClick={() => remove(index)} style={button}>×</button>
    </span>
  );
}

function Add({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} style={{ marginTop: 8, border: `1px dashed ${rule}`, background: "transparent", color: faint, borderRadius: 8, padding: "7px 8px", width: "100%", cursor: "pointer", fontSize: 12 }}>
      {children}
    </button>
  );
}

function choice(option: string | { value: string; label?: string }) {
  return typeof option === "string" ? { value: option, label: option || "Default" } : { value: option.value, label: option.label || option.value || "Default" };
}

function FieldTree({
  fields,
  root,
  patch,
  pickImage,
  prefix = "",
  covered,
}: {
  fields?: NodeField[];
  root: unknown;
  patch: (path: string, next: unknown) => void;
  pickImage: (path: string) => void;
  prefix?: string;
  covered?: Set<string>;
}) {
  if (!fields?.length) return null;
  const pathOf = (name: string) => (prefix ? `${prefix}.${name}` : name);
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {fields.map((field) => {
        const path = pathOf(field.name);
        if (covered?.has(path) || covered?.has(field.name)) return null;
        const label = field.label || field.name;
        const value = at(root, path.split("."));
        if (field.type === "image") {
          return (
            <button key={path} type="button" onClick={() => pickImage(path)} style={{ border: `1px dashed ${rule}`, background: "transparent", color: "inherit", borderRadius: 8, padding: 6, cursor: "pointer", textAlign: "left" }}>
              {raw(value) ? <img src={raw(value)} alt="" style={{ width: "100%", maxHeight: 72, objectFit: "contain" }} /> : <span style={{ color: faint, fontSize: 12 }}>{label}</span>}
            </button>
          );
        }
        if (field.type === "boolean") {
          return (
            <label key={path} style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 12 }}>
              <input type="checkbox" checked={Boolean(value)} onChange={(event) => patch(path, event.target.checked)} />
              {label}
            </label>
          );
        }
        if (field.type === "number") {
          return <Ink key={path} value={value ?? ""} placeholder={label} onChange={(next) => patch(path, next === "" ? null : Number(next))} />;
        }
        if (field.options?.length) {
          return (
            <label key={path} style={{ fontSize: 11, color: faint }}>
              {label}
              <select className="handoff-ink" value={raw(value)} onChange={(event) => patch(path, event.target.value)}>
                {field.options.map((option) => {
                  const item = choice(option);
                  return <option key={item.value} value={item.value}>{item.label}</option>;
                })}
              </select>
            </label>
          );
        }
        if (field.list && field.type === "string") {
          const items = list(value);
          return (
            <div key={path}>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: faint }}>{label}</div>
              {items.map((item, index) => (
                <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 4, alignItems: "center" }}>
                  <Ink value={item} placeholder={`${label} ${index + 1}`} onChange={(next) => patch(path, items.map((entry, i) => (i === index ? next : entry)))} />
                  <button type="button" aria-label="Remove" onClick={() => patch(path, items.filter((_, i) => i !== index))} style={{ border: 0, background: "transparent", color: faint, cursor: "pointer" }}>×</button>
                </div>
              ))}
              <Add onClick={() => patch(path, [...items, ""])}>+ Add</Add>
            </div>
          );
        }
        if (field.list && field.fields) {
          const items = list(value);
          return (
            <div key={path}>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: faint, marginBottom: 4 }}>{label}</div>
              {items.map((_, index) => (
                <div key={index} style={{ borderTop: `1px solid ${rule}`, paddingTop: 6, marginTop: 6 }}>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="button" aria-label="Remove" onClick={() => patch(path, items.filter((_, i) => i !== index))} style={{ border: 0, background: "transparent", color: faint, cursor: "pointer" }}>×</button>
                  </div>
                  <FieldTree fields={field.fields} root={root} patch={patch} pickImage={pickImage} prefix={`${path}.${index}`} covered={covered} />
                </div>
              ))}
              <Add onClick={() => patch(path, [...items, {}])}>+ Add {label.toLowerCase()}</Add>
            </div>
          );
        }
        if (field.fields) {
          return (
            <div key={path}>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: faint }}>{label}</div>
              <FieldTree fields={field.fields} root={root} patch={patch} pickImage={pickImage} prefix={path} covered={covered} />
            </div>
          );
        }
        return <Ink key={path} value={value} placeholder={label} rows={raw(value).length > 90 ? 3 : 1} onChange={(next) => patch(path, next)} />;
      })}
    </div>
  );
}

function More({ fields, root, patch, pickImage, covered }: { fields?: NodeField[]; root: unknown; patch: (path: string, next: unknown) => void; pickImage: (path: string) => void; covered: Set<string> }) {
  const hidden = fields?.some((field) => !covered.has(field.name));
  if (!hidden) return null;
  return (
    <details className="handoff-more">
      <summary>More in this section</summary>
      <div style={{ paddingTop: 8 }}>
        <FieldTree fields={fields} root={root} patch={patch} pickImage={pickImage} covered={covered} />
      </div>
    </details>
  );
}

function mediaSrc(parsed: unknown, item: { src?: string }) {
  if (typeof parsed === "string") return parsed;
  if (parsed && typeof parsed === "object" && "src" in parsed) return String((parsed as { src?: string }).src ?? "");
  return item.src ?? "";
}

function useDraft(props: WireProps) {
  const cms = useCMS();
  const value = props.input.value;
  const latest = useRef(value);
  latest.current = value;
  const patch = (path: string, next: unknown) => {
    const updated = writePath(latest.current, path.split("."), next);
    latest.current = updated;
    props.input.onChange(updated);
  };
  const pickImage = (path: string) => {
    cms.media.open({
      allowDelete: true,
      onSelect: (item: { src?: string }) => {
        const store = cms.media.store as { parse?: (media: unknown) => unknown };
        const parsed = typeof store?.parse === "function" ? store.parse(item) : item?.src;
        const src = mediaSrc(parsed, item);
        if (src) patch(path, src);
      },
    });
  };
  const add = () => props.form.mutators.push(props.field.name, {});
  const move = (from: number, to: number) => props.form.mutators.move(props.field.name, from, to);
  const remove = (index: number) => props.tinaForm.mutators.remove(props.field.name, index);
  return { value, patch, pickImage, add, move, remove, fields: props.field.fields };
}

function Hero({ value, patch, pickImage, fields }: ReturnType<typeof useDraft>) {
  const row = record(value);
  const lead = record(row.headlineLead);
  const lines = list(row.headlineLines);
  const button = record(row.primary);
  return (
    <Block label="Hero" dark>
      <Ink value={row.eyebrow} placeholder="Eyebrow" size={10} weight={650} align="center" onChange={(next) => patch("eyebrow", next)} />
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr", gap: 8, marginTop: 8 }}>
        <Ink value={lead.before} placeholder="Headline" size={22} weight={650} align="center" onChange={(next) => patch("headlineLead.before", next)} />
        <Ink value={lead.accent} placeholder="Accent" size={22} weight={650} align="center" italic family="Georgia, serif" onChange={(next) => patch("headlineLead.accent", next)} />
      </div>
      {lines.map((line, index) => {
        const item = record(line);
        return (
          <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr 78px", gap: 6, marginTop: 4 }}>
            <Ink value={item.text} placeholder={index === 0 ? "Stored first line" : "Line"} size={index === 0 ? 12 : 16} weight={index === 0 ? 500 : 650} align="center" onChange={(next) => patch(`headlineLines.${index}.text`, next)} />
            <select className="handoff-ink" aria-label="Line color" value={raw(item.tone)} onChange={(event) => patch(`headlineLines.${index}.tone`, event.target.value)}>
              <option value="">White</option>
              <option value="cyan">Cyan</option>
            </select>
          </div>
        );
      })}
      <Ink value={row.body} placeholder="Supporting line" size={12} align="center" rows={2} onChange={(next) => patch("body", next)} />
      <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <div style={{ border: "1px solid currentColor", borderRadius: 999, padding: "5px 14px", minWidth: 120 }}>
          <Ink value={button.label} placeholder="Button" size={12} weight={650} align="center" onChange={(next) => patch("primary.label", next)} />
        </div>
      </div>
      <Ink value={button.href} placeholder="Button link" size={11} align="center" onChange={(next) => patch("primary.href", next)} />
      <Ink value={row.note} placeholder="Note" size={11} align="center" onChange={(next) => patch("note", next)} />
      <button type="button" onClick={() => pickImage("image")} style={{ display: "block", width: "100%", marginTop: 10, border: "1px dashed currentColor", background: "transparent", color: "inherit", borderRadius: 8, padding: 8, cursor: "pointer" }}>
        {raw(row.image) ? "Change background photo" : "Add background photo"}
      </button>
      <Ink value={row.imageAlt} placeholder="Photo description" size={11} align="center" onChange={(next) => patch("imageAlt", next)} />
      <More fields={fields} root={value} patch={patch} pickImage={pickImage} covered={new Set(["eyebrow", "headlineLead", "headlineLines", "body", "primary", "note", "image", "imageAlt"])} />
    </Block>
  );
}

function Logos({ value, patch, pickImage, add, move, remove, fields }: ReturnType<typeof useDraft>) {
  const logos = list(value);
  return (
    <Block label="Logo bar">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
        {logos.map((logo, index) => {
          const row = record(logo);
          return (
            <div key={index} className="handoff-item" style={{ width: 92, minHeight: 42, border: `1px solid ${rule}`, borderRadius: 6, background: "#fff", padding: "4px 6px" }}>
              <ItemTools index={index} total={logos.length} move={move} remove={remove} />
              <button type="button" onClick={() => pickImage(`${index}.image`)} style={{ border: 0, background: "transparent", width: "100%", cursor: "pointer", padding: 0 }}>
                {raw(row.image) ? <img src={raw(row.image)} alt="" style={{ height: 18, width: "100%", objectFit: "contain", filter: "grayscale(1)" }} /> : <span style={{ color: faint, fontSize: 10 }}>Photo</span>}
              </button>
              <Ink value={row.name} placeholder="Name" size={9} align="center" onChange={(next) => patch(`${index}.name`, next)} />
              <details className="handoff-more">
                <summary>Options</summary>
                <FieldTree fields={fields} root={value} patch={patch} pickImage={pickImage} prefix={String(index)} covered={new Set([`${index}.name`, `${index}.image`])} />
              </details>
            </div>
          );
        })}
      </div>
      <Add onClick={add}>+ Add logo</Add>
    </Block>
  );
}

function Industries({ value, patch }: ReturnType<typeof useDraft>) {
  const row = record(value);
  return (
    <Block label="Industries">
      <Ink value={row.headline} placeholder="Headline" size={18} weight={650} onChange={(next) => patch("headline", next)} />
      <Ink value={row.body} placeholder="Intro" rows={3} onChange={(next) => patch("body", next)} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4, marginTop: 10 }}>
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} style={{ aspectRatio: "4 / 5", border: `1px solid ${rule}`, borderRadius: 6, background: "repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(28,36,48,0.05) 3px, rgba(28,36,48,0.05) 4px)" }} />
        ))}
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: faint }}>Tiles are edited on each industry page.</div>
    </Block>
  );
}

function Stats({ value, patch, add, move, remove }: ReturnType<typeof useDraft>) {
  const stats = list(value);
  return (
    <Block label="Proof">
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.max(stats.length, 1)}, 1fr)`, gap: 8 }}>
        {stats.map((stat, index) => {
          const row = record(stat);
          return (
            <div key={index} className="handoff-item" style={{ textAlign: "center", padding: "4px 2px" }}>
              <ItemTools index={index} total={stats.length} move={move} remove={remove} />
              <Ink value={row.value} placeholder="00" size={18} weight={700} align="center" onChange={(next) => patch(`${index}.value`, next)} />
              <Ink value={row.label} placeholder="Label" size={10} align="center" onChange={(next) => patch(`${index}.label`, next)} />
            </div>
          );
        })}
      </div>
      <Add onClick={add}>+ Add number</Add>
    </Block>
  );
}

function TalentMap({ value, patch, pickImage, fields }: ReturnType<typeof useDraft>) {
  const row = record(value);
  const heading = record(row.heading);
  const people = list(row.profiles);
  const cta = record(row.cta);
  return (
    <Block label="Talent map">
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 6 }}>
        <Ink value={heading.before} placeholder="Heading" size={18} weight={650} onChange={(next) => patch("heading.before", next)} />
        <Ink value={heading.link} placeholder="Link" size={18} weight={650} italic family="Georgia, serif" onChange={(next) => patch("heading.link", next)} />
      </div>
      <Ink value={row.intro} placeholder="Intro" rows={2} onChange={(next) => patch("intro", next)} />
      <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 10, alignItems: "center", marginTop: 8 }}>
        <img src="/brand/latam-outline.svg" alt="" style={{ width: 72, height: "auto", display: "block" }} />
        <div style={{ fontSize: 12, color: faint }}>{people.length} people on the map</div>
      </div>
      {people.map((person, index) => {
        const card = record(person);
        return (
          <div key={index} style={{ display: "grid", gridTemplateColumns: "42px 1fr 1fr", gap: 6, marginTop: 8, alignItems: "center" }}>
            <button type="button" onClick={() => pickImage(`profiles.${index}.photo`)} style={{ width: 42, height: 42, borderRadius: 999, border: `1px solid ${rule}`, padding: 0, overflow: "hidden", background: "#fff", cursor: "pointer" }}>
              {raw(card.photo) ? <img src={raw(card.photo)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 10, color: faint }}>+</span>}
            </button>
            <Ink value={card.name} placeholder="Name" weight={700} onChange={(next) => patch(`profiles.${index}.name`, next)} />
            <Ink value={card.role} placeholder="Role" onChange={(next) => patch(`profiles.${index}.role`, next)} />
            <span />
            <Ink value={card.city} placeholder="City" size={12} onChange={(next) => patch(`profiles.${index}.city`, next)} />
            <Ink value={card.country} placeholder="Country" size={12} onChange={(next) => patch(`profiles.${index}.country`, next)} />
            <span />
            <Ink value={card.department} placeholder="Department" size={12} onChange={(next) => patch(`profiles.${index}.department`, next)} />
            <Ink value={card.salary} placeholder="Salary" size={12} onChange={(next) => patch(`profiles.${index}.salary`, next)} />
          </div>
        );
      })}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
        <Ink value={cta.label} placeholder="Button" onChange={(next) => patch("cta.label", next)} />
        <Ink value={cta.href} placeholder="Button link" onChange={(next) => patch("cta.href", next)} />
      </div>
      <Ink value={row.salaryLabel} placeholder="Salary label" size={12} onChange={(next) => patch("salaryLabel", next)} />
      <More fields={fields} root={value} patch={patch} pickImage={pickImage} covered={new Set(["heading", "intro", "profiles", "cta", "salaryLabel"])} />
    </Block>
  );
}

function Academy({ value, patch, pickImage, fields }: ReturnType<typeof useDraft>) {
  const row = record(value);
  const headline = record(row.headline);
  const tracks = list(row.tracks);
  const trackFields = fields?.find((field) => field.name === "tracks")?.fields;
  return (
    <Block label="Academy">
      <div style={{ display: "inline-block", border: `1px solid ${rule}`, borderRadius: 999, padding: "2px 8px" }}>
        <Ink value={row.eyebrow} placeholder="Eyebrow" size={10} weight={650} onChange={(next) => patch("eyebrow", next)} />
      </div>
      <div style={{ marginTop: 8 }}>
        <Ink value={headline.before} placeholder="Headline" size={18} weight={650} onChange={(next) => patch("headline.before", next)} />
        <span style={{ display: "inline-block", border: `1px solid ${ink}`, borderRadius: 4, padding: "0 4px", marginTop: 4 }}>
          <Ink value={headline.highlight} placeholder="Highlight" size={18} weight={650} onChange={(next) => patch("headline.highlight", next)} />
        </span>
      </div>
      <Ink value={row.subhead} placeholder="Subhead" rows={2} onChange={(next) => patch("subhead", next)} />
      <Ink value={row.subheadBold} placeholder="Bold line" weight={700} onChange={(next) => patch("subheadBold", next)} />
      <Ink value={row.toolsLabel} placeholder="Tools label" size={11} onChange={(next) => patch("toolsLabel", next)} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
        {list(row.tools).map((tool, index) => (
          <div key={index} className="handoff-item" style={{ width: 88, border: `1px solid ${rule}`, borderRadius: 8, padding: 4 }}>
            <button type="button" aria-label="Remove tool" onClick={() => patch("tools", list(row.tools).filter((_, i) => i !== index))} style={{ position: "absolute", top: 0, right: 2, border: 0, background: "transparent", color: faint, cursor: "pointer" }}>×</button>
            <button type="button" onClick={() => pickImage(`tools.${index}.icon`)} style={{ border: 0, background: "transparent", width: "100%", cursor: "pointer", padding: 0 }}>
              {raw(record(tool).icon) ? <img src={raw(record(tool).icon)} alt="" style={{ height: 16, objectFit: "contain" }} /> : <span style={{ color: faint, fontSize: 10 }}>Icon</span>}
            </button>
            <Ink value={record(tool).name} placeholder="Tool" size={10} align="center" onChange={(next) => patch(`tools.${index}.name`, next)} />
            <label style={{ display: "flex", gap: 4, alignItems: "center", fontSize: 9, color: faint }}>
              <input type="checkbox" checked={Boolean(record(tool).mono)} onChange={(event) => patch(`tools.${index}.mono`, event.target.checked)} />
              Single color
            </label>
          </div>
        ))}
      </div>
      <Add onClick={() => patch("tools", [...list(row.tools), {}])}>+ Add tool</Add>
      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        {tracks.map((track, index) => (
          <div key={index} style={{ flex: 1, border: `1px solid ${rule}`, borderRadius: 999, padding: "4px 8px", textAlign: "center" }}>
            <Ink value={record(track).kicker} placeholder="Kicker" size={9} weight={700} align="center" onChange={(next) => patch(`tracks.${index}.kicker`, next)} />
            <Ink value={record(track).title} placeholder="Title" size={11} align="center" onChange={(next) => patch(`tracks.${index}.title`, next)} />
          </div>
        ))}
      </div>
      <Add onClick={() => patch("tracks", [...tracks, { details: {} }])}>+ Add course</Add>
      {tracks.map((track, index) => (
        <details key={index} className="handoff-more">
          <summary>{raw(record(track).title) || `Track ${index + 1}`} details</summary>
          <button type="button" onClick={() => patch("tracks", tracks.filter((_, i) => i !== index))} style={{ marginTop: 6, border: 0, background: "transparent", color: faint, cursor: "pointer", fontSize: 12 }}>Remove course</button>
          <div style={{ paddingTop: 8 }}>
            <FieldTree fields={trackFields} root={value} patch={patch} pickImage={pickImage} prefix={`tracks.${index}`} covered={new Set([`tracks.${index}.kicker`, `tracks.${index}.title`])} />
          </div>
        </details>
      ))}
      <Ink value={row.comingSoon} placeholder="Empty course line" size={12} onChange={(next) => patch("comingSoon", next)} />
      <More fields={fields} root={value} patch={patch} pickImage={pickImage} covered={new Set(["eyebrow", "headline", "subhead", "subheadBold", "toolsLabel", "tools", "tracks", "comingSoon"])} />
    </Block>
  );
}

function Reasons({ value, patch, pickImage, fields }: ReturnType<typeof useDraft>) {
  const row = record(value);
  const cards = list(row.categories);
  const cardFields = fields?.find((field) => field.name === "categories")?.fields;
  return (
    <Block label="Why LatAm">
      <Ink value={row.headline} placeholder="Headline" size={18} weight={650} onChange={(next) => patch("headline", next)} />
      <Ink value={row.subhead} placeholder="Subhead" rows={2} onChange={(next) => patch("subhead", next)} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginTop: 10 }}>
        {cards.map((card, index) => (
          <div key={index} className="handoff-item" style={{ border: `1px solid ${rule}`, borderRadius: 8, minHeight: 64, padding: 6 }}>
            <button type="button" aria-label="Remove reason" onClick={() => patch("categories", cards.filter((_, i) => i !== index))} style={{ position: "absolute", top: 2, right: 4, border: 0, background: "transparent", color: faint, cursor: "pointer" }}>×</button>
            <Ink value={record(card).title} placeholder="Title" size={12} weight={700} onChange={(next) => patch(`categories.${index}.title`, next)} />
            <FieldTree fields={cardFields} root={value} patch={patch} pickImage={pickImage} prefix={`categories.${index}`} covered={new Set([`categories.${index}.title`])} />
          </div>
        ))}
      </div>
      <Add onClick={() => patch("categories", [...cards, {}])}>+ Add reason</Add>
      <More fields={fields} root={value} patch={patch} pickImage={pickImage} covered={new Set(["headline", "subhead", "categories"])} />
    </Block>
  );
}

function Clips({ value, patch, pickImage, fields }: ReturnType<typeof useDraft>) {
  const row = record(value);
  const clips = list(row.clips);
  const clipFields = fields?.find((field) => field.name === "clips")?.fields;
  return (
    <Block label="Vibes" dark>
      <div style={{ fontSize: 20, fontWeight: 650, letterSpacing: "-0.03em", display: "flex", flexWrap: "wrap", gap: 6, alignItems: "baseline" }}>
        <Ink value={row.headline} placeholder="Headline" size={20} weight={650} onChange={(next) => patch("headline", next)} />
        <span style={{ borderBottom: "2px solid currentColor" }}>
          <Ink value={row.headlineAccent} placeholder="Accent" size={20} weight={650} italic family="Georgia, serif" onChange={(next) => patch("headlineAccent", next)} />
        </span>
        <Ink value={row.headlineAfter} placeholder="." size={20} weight={650} onChange={(next) => patch("headlineAfter", next)} />
      </div>
      <Ink value={row.body} placeholder="Paragraph" rows={2} onChange={(next) => patch("body", next)} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginTop: 12 }}>
        {clips.map((clip, index) => (
          <div key={index} className="handoff-item" style={{ border: "1px solid rgba(243,240,232,0.45)", borderRadius: 8, minHeight: 72, padding: 6 }}>
            <button type="button" aria-label="Remove clip" onClick={() => patch("clips", clips.filter((_, i) => i !== index))} style={{ position: "absolute", top: 2, right: 4, border: 0, background: "transparent", color: "inherit", cursor: "pointer" }}>×</button>
            <Ink value={record(clip).name} placeholder="Name" size={11} weight={650} onChange={(next) => patch(`clips.${index}.name`, next)} />
            <button type="button" onClick={() => pickImage(`clips.${index}.video`)} style={{ marginTop: 6, border: "1px dashed currentColor", background: "transparent", color: "inherit", borderRadius: 6, width: "100%", cursor: "pointer", fontSize: 10 }}>
              {raw(record(clip).video) ? "Change video" : "Add video"}
            </button>
          </div>
        ))}
      </div>
      <Add onClick={() => patch("clips", [...clips, {}])}>+ Add clip</Add>
      {clips.map((clip, index) => (
        <details key={index} className="handoff-more">
          <summary>{raw(record(clip).name) || `Clip ${index + 1}`}</summary>
          <div style={{ paddingTop: 8 }}>
            <FieldTree fields={clipFields} root={value} patch={patch} pickImage={pickImage} prefix={`clips.${index}`} covered={new Set([`clips.${index}.name`, `clips.${index}.video`])} />
          </div>
        </details>
      ))}
      <More fields={fields} root={value} patch={patch} pickImage={pickImage} covered={new Set(["headline", "headlineAccent", "headlineAfter", "body", "clips"])} />
    </Block>
  );
}

function Dictionary({ value, patch, pickImage, fields }: ReturnType<typeof useDraft>) {
  const row = record(record(value).dictionary);
  return (
    <Block label="Alma">
      <Ink value={row.intro} placeholder="Intro" size={11} align="center" onChange={(next) => patch("dictionary.intro", next)} />
      <Ink value={row.headword} placeholder="headword" size={34} weight={500} align="center" family="Georgia, serif" onChange={(next) => patch("dictionary.headword", next)} />
      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        <Ink value={row.pronunciation} placeholder="[pronunciation]" size={12} align="center" italic onChange={(next) => patch("dictionary.pronunciation", next)} />
        <Ink value={row.partOfSpeech} placeholder="noun" size={12} align="center" italic onChange={(next) => patch("dictionary.partOfSpeech", next)} />
      </div>
      <Ink value={row.definition} placeholder="Definition" align="center" rows={2} onChange={(next) => patch("dictionary.definition", next)} />
      <More fields={fields} root={value} patch={patch} pickImage={pickImage} covered={new Set(["dictionary"])} />
    </Block>
  );
}

function Section({ label, value, patch, pickImage, add, move, remove, fields }: ReturnType<typeof useDraft> & { label: string }) {
  if (Array.isArray(value)) {
    return (
      <Block label={label}>
        {value.map((item, index) => (
          <div key={index} className="handoff-item" style={{ border: `1px solid ${rule}`, borderRadius: 8, padding: "8px 8px 4px", marginBottom: 6 }}>
            <ItemTools index={index} total={value.length} move={move} remove={remove} />
            <FieldTree fields={fields} root={value} patch={patch} pickImage={pickImage} prefix={String(index)} />
          </div>
        ))}
        <Add onClick={add}>+ Add</Add>
      </Block>
    );
  }
  return (
    <Block label={label}>
      <FieldTree fields={fields} root={value} patch={patch} pickImage={pickImage} />
    </Block>
  );
}

const sketches = { hero: Hero, logos: Logos, industries: Industries, stats: Stats, map: TalentMap, academy: Academy, reasons: Reasons, clips: Clips, dictionary: Dictionary };

export function wire(sketch: Sketch = "section") {
  return function Wireframe(props: WireProps) {
    useStyle();
    const draft = useDraft(props);
    if (sketch === "section") return <Section label={props.field.label || "Section"} {...draft} />;
    const View = sketches[sketch];
    return <View {...draft} />;
  };
}
