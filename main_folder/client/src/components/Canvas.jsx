import '../styles/canvas.scss';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { useEffect } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import { Modal, Button } from "react-bootstrap";
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const Canvas = observer(() => {
  const [modal, setModal] = useState(true)

  const canvasRef = useRef()
  const usernameRef = useRef()

  const params = useParams()

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
  }, [])

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket('ws://localhost:5000')
      canvasState.setSocket(socket)
      canvasState.setSessionId(params.id)
      toolState.setTool(new Brush(canvasRef.current, socket, params.id))
      socket.onopen = () => {
        socket.send(JSON.stringify({
          id: params.id,
          username: canvasState.username,
          method: 'connection',
        }))
      }
      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data)
        switch (msg.method) {
          case 'connection':
            console.log(`User ${msg.username} connected!`)
            break
          case 'draw':
            drawHandler(msg)
            break
        }
      }
    }
  }, [canvasState.username])

  const drawHandler = (msg) => {
    const figure = msg.figure
    const ctx = canvasRef.current.getContext('2d')
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y)
        break
      case 'finish':
        ctx.beginPath()
        break
    }
  }

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL())
  }

  const connectionHandler = () => {
    canvasState.setUserName(usernameRef.current.value)
    setModal(false)
  }

  return (
    <div className="canvas">
      <Modal show={modal} onHide={() => { }}>
        <Modal.Header>
          <Modal.Title>Enter Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" ref={usernameRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectionHandler()}>
            Enter
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onMouseDown={() => mouseDownHandler()}
      ></canvas>
    </div>
  )
})