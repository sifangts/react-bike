import React, { Component } from 'react'
import { Card } from 'antd'
import axios from './../../axios/index'
import './detail.css'
// import Item from 'antd/lib/list/Item'
export default class OrderDetail extends Component {
    state = {
        orderInfo: {}
    }
    componentDidMount() {
        console.log(this.props.match)
        let orderIds = this.props.match.params.orderId;
        console.log(orderIds)
        if (orderIds) {
            this.getDetailInfo(orderIds);
        }
        // console.log(orderInfo)

    }
    getDetailInfo = (orderIds) => {
        axios.ajax({
            url: '/order/detail',
            data: {
                params: {
                    orderId: orderIds
                }
            }
        }).then(res => {
            console.log(res)
            if (res.code === 0) {

                this.setState({
                    orderInfo: res.result
                })

                this.renderMap(res.result);
            }
        })
    }
    renderMap = (result) => {
        //创建Map实例
        this.map = new window.BMapGL.Map('orderDetailMap');
        //初始化地图,设置中心点坐标和地图级别
        this.map.centerAndZoom(new window.BMapGL.Point(116.404, 39.915), 11);
        // 调用地图控件添加方法
        this.addMapControl();
        //调用调用绘制用户行驶路线方法
        this.drawBikeRoute(result.position_list);
        // 调用绘制服务区方法
        this.drawServiceArea(result.area);
    }
    //添加地图控件
    addMapControl = () => {
        let map = this.map
        map.addControl(new window.BMapGL.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
        map.addControl(new window.BMapGL.ZoomControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    }
    //绘制用户行驶路线
    drawBikeRoute = (positionList) => {
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if (positionList.length > 0) {
            let first = positionList[0];
            let last = positionList[positionList.length - 1];
            startPoint = new window.BMapGL.Point(first.lon, first.lat);
            let startIcon = new window.BMapGL.Icon('/assets/start_point.png', new window.BMapGL.Size(36, 42), {
                imageSize: new window.BMapGL.Size(36, 42),
                anchor: new window.BMapGL.Size(36, 42),
            });
            let startMarker = new window.BMapGL.Marker(startPoint, { icon: startIcon });
            map.addOverlay(startMarker);
            endPoint = new window.BMapGL.Point(last.lon, last.lat);
            let endIcon = new window.BMapGL.Icon('/assets/end_point.png', new window.BMapGL.Size(36, 42), {
                imageSize: new window.BMapGL.Size(36, 42),
                anchor: new window.BMapGL.Size(36, 42),
            });
            let endMarker = new window.BMapGL.Marker(endPoint, { icon: endIcon });
            map.addOverlay(endMarker);
        }
        //链接路线图
        let trackPoint = [];
        for (let i = 0; i < positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new window.BMapGL.Point(point.lon, point.lat))
        }
        let polyline = new window.BMapGL.Polyline(trackPoint, {
            strokeColor: '#1869AD',
            strokeWeight: 3,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyline);
        this.map.centerAndZoom(endPoint, 11)
    }
    //绘制服务区
    drawServiceArea=positionList=>{
        let trackPoint = [];
        for (let i = 0; i < positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new window.BMapGL.Point(point.lon, point.lat))
        }
        let polygon=new window.BMapGL.Polygon(trackPoint,{
            strokeColor:'#CE0000',
            strokeWeight:3,
            fillColor:'#0099ff',
            fillOpacity:0.4
        })
        this.map.addOverlay(polygon)
    }
    render() {
        const info = this.state.orderInfo || {};
        return (
            <div>
                <Card className='order-detail-card1'>
                    <div id="orderDetailMap" className='order-map'>1111</div>
                    <div className='detail-items'>
                        <div className='item-title'>基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode === 1 ? "服务区" : "禁停区"}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{this.state.orderInfo.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行驶起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶终点</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{info.distance + "公里"}</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}
