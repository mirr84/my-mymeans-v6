import React from 'react';

import {connector} from "../../store/utils/connector";
import lifecycle from "react-pure-lifecycle";
import {Collapse, Divider, Table, Tag} from "antd";
const Panel = Collapse.Panel;

const methods = {
    componentWillMount({dispatch}) {
        console.log('init Account');
        dispatch.setter( 'layoutReducer', {title: 'Счета', subTitle: ''} );
    }
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}, {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
        <span>
      {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
    </span>
    ),
}, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
      <a href="javascript:;">Invite {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>
    </span>
    ),
}];

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
}];


const Account = ({state, dispatch}) => {

    return (
        <div>

            <Collapse defaultActiveKey={['1','2', '3']} onChange={(e)=>{}}>
                <Panel header="писок счетов (добавление и редактирование)" key="1">
                    <Table columns={columns} dataSource={data} size="small" />
                </Panel>
                <Panel header="Парамметры выбранного счета" key="2">
                    <p>{text}</p>
                </Panel>
                <Panel header="Документы по счету" key="3" disabled={false}>
                    <p>{text}</p>
                </Panel>
            </Collapse>

        </div>
    )

}

export default connector(lifecycle(methods)(Account));
