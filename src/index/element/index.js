/*
 * @Author: liuhanchuan 
 * @Date: 2023-01-30 09:48:13 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-02-08 15:44:44
 * 按需加载element UI 组件
 */
import 'element-ui/lib/theme-chalk/index.css'
import {
    Pagination,
    Dialog,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    Popover,
    Tooltip,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Slider,
    Icon,
    Collapse,
    CollapseItem,
    ColorPicker,
    Drawer,
    Loading,
    Empty,
    Message,
    Popconfirm,
    MessageBox,
    Alert,
        } from 'element-ui'
export default {
    install: function(Vue) {
        Vue.use(Pagination);
        Vue.use(Dialog);
        Vue.use(Dropdown);
        Vue.use(DropdownMenu);
        Vue.use(DropdownItem);
        Vue.use(Input);
        Vue.use(InputNumber);
        Vue.use(Radio);
        Vue.use(Drawer)
        Vue.use(RadioGroup);
        Vue.use(RadioButton);
        Vue.use(Checkbox);
        Vue.use(CheckboxButton);
        Vue.use(CheckboxGroup);
        Vue.use(Switch);
        Vue.use(Select);
        Vue.use(Option);
        Vue.use(OptionGroup);
        Vue.use(Button);
        Vue.use(ButtonGroup);
        Vue.use(Table);
        Vue.use(TableColumn);
        Vue.use(Popover);
        Vue.use(Tooltip);
        Vue.use(Form);
        Vue.use(FormItem);
        Vue.use(Tabs);
        Vue.use(TabPane);
        Vue.use(Tag);
        Vue.use(Slider);
        Vue.use(Icon);
        Vue.use(Collapse);
        Vue.use(CollapseItem);
        Vue.use(ColorPicker);
        Vue.use(Empty);
        Vue.use(Popconfirm);
        Vue.use(Alert);
        Vue.use(Loading);
        Vue.use(Loading.directive);
        Vue.prototype.$message = Message;
        Vue.prototype.$msgbox = MessageBox;
        Vue.prototype.$alert = MessageBox.alert;
        Vue.prototype.$confirm = MessageBox.confirm;
        Vue.prototype.$prompt = MessageBox.prompt;
    }
}