import { FormProps, FormSchema } from '@/components/Table';
import { BasicColumn } from '@/components/Table/src/types/table';

export function getActionColumn(): BasicColumn {
  return {
    width: 160,
    title: '操作',
    dataIndex: 'action',
  };
}
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '车牌号',
      dataIndex: 'car',
      width: 150,
    },
    {
      title: '逝者姓名',
      dataIndex: 'occupantName',
      width: 150,
    },
    {
      title: '性别',
      dataIndex: 'occupantSex',
      width: 50,
    },
    {
      title: '状态',
      width: 150,
      dataIndex: 'reservationStatus',
    },
    {
      title: '接运时间',
      width: 150,
      sorter: true,
      dataIndex: 'pickUpTime',
    },
  ];
}
export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      ...getAdvanceSchema(5),
      {
        field: `field11`,
        label: `Slot示例`,
        component: 'Select',
        slot: 'custom',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}
export const getAdvanceSchema = (itemNumber = 6): FormSchema[] => {
  const arr: any = [];
  for (let index = 0; index < itemNumber; index++) {
    arr.push({
      field: `field${index}`,
      label: `字段${index}`,
      component: 'Input',
      colProps: {
        xl: 12,
        xxl: 8,
      },
    });
  }
  return arr;
};
