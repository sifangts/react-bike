import React, { Component } from 'react'
import {Card,Button, message} from 'antd'
import './ui.css'
export default class Message extends Component {
    showMessage=(type)=>{
        message[type]('恭喜你，React课程晋级成功')
    }
    render() {
        return (
            <div className='button1'>
                <Card title='全局提示框' className='card-wrap'>
                    <Button type='primary' onClick={()=>this.showMessage('success')}>Success</Button>
                    <Button type='primary' onClick={()=>this.showMessage('info')}>Info</Button>
                    <Button type='primary' onClick={()=>this.showMessage('warning')}>Warning</Button>
                    <Button type='primary' onClick={()=>this.showMessage('error')}>Error</Button>
                    <Button type='primary' onClick={()=>this.showMessage('loading')}>Loading</Button>
                </Card>
            </div>
        )
    }
}
