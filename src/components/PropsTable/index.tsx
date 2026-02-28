import './PropsTable.css'

export interface PropRow {
  prop: string
  type: string
  default?: string
  description: string
  required?: boolean
}

interface PropsTableProps {
  rows: PropRow[]
}

export default function PropsTable({ rows }: PropsTableProps) {
  return (
    <div className="props-table-wrapper">
      <table className="props-table">
        <thead>
          <tr>
            <th>属性 / Prop</th>
            <th>类型 / Type</th>
            <th>默认值 / Default</th>
            <th>说明 / Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.prop}>
              <td>
                <code className="props-name">{row.prop}</code>
                {row.required && <span className="props-required">*</span>}
              </td>
              <td><code className="props-type">{row.type}</code></td>
              <td>
                {row.default !== undefined
                  ? <code className="props-default">{row.default}</code>
                  : <span className="props-empty">—</span>}
              </td>
              <td className="props-desc">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
