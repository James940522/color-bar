// Library
import React, { FC, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

// UI
import colorBarImage from "src/components/Dashboard/img/rgb.jpg"

// Function
import { heatmapColorChange } from "src/redux/slices/dashboard/HeatmapSlice"

const HeatmapColorBar: FC = () => {
  const dispatch = useDispatch()

  // colorBar 내부 offset x offset y 좌표 값을 저장
  let x: number = null
  let y: number = null

  let ctx: CanvasRenderingContext2D = null

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const setCoordinate = (
    e: React.MouseEvent<HTMLCanvasElement | MouseEvent>
  ) => {
    x = e.nativeEvent.offsetX
    y = e.nativeEvent.offsetY
  }

  const colorPick = () => {
    if (ctx) {
      // color bar의 rgb 값 0 to 255
      const { data } = ctx.getImageData(x, y, 1, 1)

      const r = data[0]
      const g = data[1]
      const b = data[2]

      dispatch(heatmapColorChange([r, g, b]))
    }
  }

  const initColorBar = () => {
    const canvas: HTMLCanvasElement = canvasRef.current
    ctx = canvas.getContext("2d")
    const img: HTMLImageElement = new Image()

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }

    img.src = colorBarImage
  }

  useEffect(() => {
    initColorBar()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        marginTop: "1rem",
        height: "20px",
        width: "100%",
        border: "1px solid black",
      }}
      onMouseMove={(e) => {
        setCoordinate(e)
      }}
      onClick={() => {
        colorPick()
      }}
    />
  )
}

export default HeatmapColorBar
