import React from 'react';
import { useLocation } from 'react-router';
import { NavBar, Cell, Button, Toast } from '@nutui/nutui-react';
import { ArrowLeft } from '@nutui/icons-react';

const CreateOrder = () => {
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: [] };

  React.useEffect(() => {
    console.log('Selected Items:', selectedItems);
    if (selectedItems.length === 0) {
      Toast.show('没有选择任何商品');
      // navigator.back();
    }
  }, [selectedItems]);

  const handleSubmitOrder = () => {
    Toast.show('订单创建成功');
  };

  return (
    <div className="create-order-page">
      <NavBar
        back={<ArrowLeft onClick={() => window.history.back()} />}
        onBackClick={() => window.history.back()}
      >
        创建订单
      </NavBar>

      <Cell title="目的地址" description="北京市朝阳区某某路某某号" />

      {selectedItems.length > 0 ? (
        selectedItems.map((item, index) => (
          <Cell key={index} title={`商品ID: ${item}`} />
        ))
      ) : (
        <Cell title="没有选择任何商品" />
      )}

      <Cell title="订单合计" description="￥0.00" />

      <div style={{ padding: '16px' }}>
        <Button type="primary" block onClick={handleSubmitOrder}>
          提交订单
        </Button>
      </div>
    </div>
  );
};

export default CreateOrder;
