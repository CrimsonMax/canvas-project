import toolState from '../store/toolState'
import '../styles/toolbar.scss'

export const Settings = () => {
  return (
    <div className="settings">
      <label htmlFor="line-width" style={{ margin: '0 10px' }} >Line Width</label>
      <input
        id="line-width"
        style={{ margin: '0 10px' }}
        type="number"
        min={1}
        max={50}
        defaultValue={5}
        onChange={(e) => toolState.setLineWidth(e.target.value)}
      />

      <label htmlFor="stroke-color">Stroke color</label>
      <input
        id="stroke-color"
        type="color"
        style={{ margin: '0 10px' }}
        onChange={(e) => toolState.setStrokeColor(e.target.value)}
      />
    </div>
  )
}