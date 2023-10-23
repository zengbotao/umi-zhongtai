/**
 * @author M
 * @email mpw0311@163.com
 * @version  1.0.0
 * @description  用户登录组件
 */
import { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
import { formatMessage } from 'umi/locale';
// import LoginQrcode from './loginQrcode';
import styles from './index.less';
import imgUrl from '@/assets/qrcode_for_wechat.jpg';

const FormItem = Form.Item;
@connect(({ login }) => ({ isError: login.isError }))
class Login extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;//接受父组件传递的事件
    // 在这个例子中，form属性被传递给了Login组件。
    // 当Login组件被渲染时，它可以通过this.props来获取传递给它的属性。
    // 因此，通过解构赋值的方式，可以将form属性值赋给const { form, onSubmit } = this.props;，从而在Login组件内部可以直接使用form变量。
    // 需要注意的是，在使用form属性之前，确保在父组件中使用了Form.create()进行表单对象的包装，以便将表单对象传递给子组件。例如，可以在父组件中使用类似以下方式进行包装：

    form.validateFields({ force: true }, (errors, values) => {
      onSubmit(errors, values);
      // onSubmit(errors, values)：调用传递给组件的 onSubmit 回调函数，并将验证错误信息和字段值作为参数传递给它。
    });
  };
  // form.validateFields({ force: true }, (errors, values) => { ... })：
  // 调用表单对象的 validateFields 方法进行表单字段的验证。force: true 表示强制进行验证，即使字段没有发生改变。

  // (errors, values) => { onSubmit(errors, values); }：回调函数，当验证完成后被调用。
  // errors 是一个包含验证错误信息的对象，values 是一个包含所有字段值的对象。


  handleChange = () => {
    if (this.props.isError === true) {
      this.props.dispatch({
        type: 'login/save',
        payload: {
          isError: false,
        },
      });
    }
  };
  qrcodeClick() {
    Modal.info({
      title: '关注公众号即可获取登录密码',
      content: (
        <div>
          <br />
          <div style={{ textAlign: 'center' }}>
            <img src={imgUrl} alt="公众号" width={120} />
          </div>
          <p style={{ textAlign: 'center' }}>关注有福利</p>
        </div>
      ),
      onOk() {},
      okText: '知道了',
    });
  }
  componentDidMount() {
    // this.qrcodeClick();
  }
  render() {
    const { loading, form, isError } = this.props;
    const { getFieldDecorator: fd } = form;
    //getFieldDecorator 方法接受两个参数：字段名和配置对象。
    // 对于每个输入框，都通过调用 fd 方法来包装对应的 Input 组件。这样做的目的是将输入框与表单进行绑定，并且可以通过表单对象 form 来获取输入框的值。
    const error = isError
      ? {
          validateStatus: 'error',
          help: '用户名或密码错误',
        }
      : {};
    return (
      <div className={styles.login_form}>
        {/* <LoginQrcode onClick={this.qrcodeClick} /> */}
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...error}>
            {fd('username', {
              initialValue: 'admin',
              rules: [
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ],
            })(
              <Input
                prefix={<Icon type="user" className={styles.color} />}
                onChange={this.handleChange}
                placeholder={formatMessage({ id: 'login.userName' })}
              />,
            )}
          </FormItem>
          <FormItem {...error}>
            {fd('password', {
              initialValue: '',
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input
                prefix={<Icon type="lock" className={styles.color} />}
                type="password"
                onChange={this.handleChange}
                placeholder={formatMessage({ id: 'login.password' })}
              />,
            )}
          </FormItem>
          <FormItem>
            {fd('rememberMe', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>{formatMessage({ id: 'login.remember-me' })}</Checkbox>)}
            <a className={styles.login_form_forgot} href="/">
              {formatMessage({ id: 'login.forgot-password' })}
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.login_form_button}
              loading={loading}
            >
              {formatMessage({ id: 'login.login' })}
            </Button>
            <a href="/#register"> {formatMessage({ id: 'login.signup' })}!</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
// 为了能够使用 getFieldDecorator 方法，
// 组件需要使用 Form.create() 进行包装，以便获取到表单对象 form。
// 在这段代码中，通过 export default Form.create()(Login) 将组件进行了包装。