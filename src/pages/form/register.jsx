import React, { Component } from 'react'
import { Card, Form, Input, InputNumber,Button, Upload, Radio, Select, Switch, DatePicker, TimePicker,Checkbox } from 'antd'
import moment from 'moment';
// import Icon from '@ant-design/icons/lib/components/AntdIcon';
import {LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './form.css'

const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;
export default class Register extends Component {
    state = {}
    // handleSubmit=()=>{
    //     let userInfo=this.props.getFieldsValue();
    //     console.log(userInfo)
    // }
    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }
  
    handleChange = info => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            userImg: imageUrl,
            loading: false,
          }),
        );
      }
    };
    render() {
        const {  loading } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        const rowObject = {
            minRows: 4,
            maxRows: 6
        }
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        const offsetLayout={
            wrapperCol:{
                x:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        return (
            <div className='button1'>
                <Card title='????????????'>
                    <Form layout='horizontal' {...formItemLayout}>
                        <FormItem label='?????????'
                            name='userName'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name'
                                }
                            ]}>
                            <Input placeholder='??????????????????' />
                        </FormItem>
                        <FormItem label='??????' name='password' {...formItemLayout}>
                            <Input placeholder='???????????????'></Input>
                        </FormItem>
                        <FormItem label='??????' name='gender'  >
                            <Radio.Group>
                                <Radio value={1}>???</Radio>
                                <Radio value={0}>???</Radio>
                            </Radio.Group>
                        </FormItem>
                        <FormItem label='??????' name='age' initialValue={18}  >
                            <InputNumber />
                        </FormItem>
                        <FormItem label='????????????' name='status' initialValue={1} >
                            <Select showSearch>
                                <Option value='0'>????????????</Option>
                                <Option value='1'>????????????</Option>
                                <Option value='2'>??????????????????</Option>
                                <Option value='3'>?????????</Option>
                            </Select>
                        </FormItem>
                        <FormItem label='??????' name='interest' initialValue={['0', '1', '2', '3']} >
                            <Select
                                showSearch
                                mode='multiple'>
                                <Option value='0'>???</Option>
                                <Option value='1'>???</Option>
                                <Option value='2'>rap</Option>
                                <Option value='3'>?????????</Option>
                                <Option value='4'>?????????</Option>
                                <Option value='5'>??????</Option>
                                <Option value='6'>????????????</Option>
                            </Select>
                        </FormItem>
                        <FormItem label='????????????' name='isMarried' valuePropName="checked">
                            <Switch defaultChecked />
                        </FormItem>
                        <FormItem label='??????' name='birthday' initialValue={moment('2022-08-05 11:02')}>
                            <DatePicker format='YYYY-MM-DD HH:mm' />
                        </FormItem>
                        <FormItem label='????????????' name='address' initialValue='????????????????????????????????????'>
                            <TextArea autoSize={rowObject} />
                        </FormItem>
                        <FormItem label='????????????' name='time'>
                            <TimePicker />
                        </FormItem>
                        <FormItem label='??????' name='userImg' valuePropName="fileList" >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                onChange={this.handleChange}
                            >
                                {/* {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                ) : (
                                    uploadButton
                                )} */}
                                {this.state.userImg?<img src={this.state.userImg} alt=''/>:uploadButton}
                            </Upload>
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Checkbox defaultChecked>
                                ??????????????????<a href="/#">????????????</a>
                            </Checkbox>
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type='primary' onClick={this.handleSubmit}>??????</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
