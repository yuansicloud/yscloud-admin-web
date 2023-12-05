<template>
  <BasicTable class="text-lg" @register="registerTable">
    <template #headerTop>
      <div class="flex text-5xl"
        ><div>{{ currentTime }}</div
        ><Button type="primary" shape="circle" @click="voice"> P </Button></div
      >
    </template>
    <!-- <template #toolbar>
      <a-button type="primary" @click="getFormValues">获取表单数据</a-button>
    </template> -->
    <template #headerCell="{ title }">
      <div class="text-6xl">{{ title }}</div>
    </template>
    <template #bodyCell="{ column, record }">
      <div class="text-6xl">
        <template v-if="column.key === 'cremator'">
          {{ record.cremator.name }}
        </template>
        <template v-if="column.key === 'occupantName'">
          {{ record.occupantName }}
        </template>
        <template v-if="column.key === 'occupantSex'">
          {{ getSexDisplayName(record.occupantSex) }}
        </template>
        <template v-if="column.key === 'reservationStatus'">
          <div
            :class="{
              'text-green': record.reservationStatus === 3,
              'text-red': record.reservationStatus === 2,
              'text-blue': record.reservationStatus === 1,
            }"
          >
            {{ getReservationStatusDisplayName(record.reservationStatus) }}
          </div>
        </template>
        <template v-if="column.key === 'creationTime'">
          {{ dateUtil(record.creationTime).format('HH:mm') }}
        </template>
      </div>
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import Speech from 'speak-tts';
  import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
  import { Button } from 'ant-design-vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { getBasicColumns } from './tableData';
  import { cremationReservationListApi } from '/@/api/funeral/cremation';
  import { dateUtil } from '@/utils/dateUtil';
  import { formatPagedRequest } from '@/utils/http/abp/helper';

  export default defineComponent({
    components: { BasicTable },
    setup() {
      const currentTime = ref('');
      const speech = new Speech();

      function updateCurrentTime() {
        currentTime.value = new Date().toLocaleTimeString();
      }

      onMounted(() => {
        updateCurrentTime(); // Update once immediately
        const timeWatch = setInterval(updateCurrentTime, 1000); // Update every second
        const listWatch = setInterval(refreshOrFlipPage, 30000); // Call every 30 seconds
        onBeforeUnmount(() => {
          clearInterval(listWatch);
          clearInterval(timeWatch); // Clear the interval when component is unmounted
        });
      });

      const [registerTable, { getPaginationRef, setPagination, reload }] = useTable({
        // title: '火化信息',
        api: cremationReservationListApi,
        columns: getBasicColumns(),
        searchInfo: { CreationStartTime: dateUtil().format('YYYY-MM-DD 00:00:00') },
        showTableSetting: true,
        tableSetting: { fullScreen: true },
        showIndexColumn: false,
        rowKey: 'id',
        beforeFetch: formatPagedRequest,
        bordered: true,
      });

      function getSexDisplayName(sex) {
        if (sex == 0) {
          return '女';
        }

        if (sex == 1) {
          return '男';
        }

        return '-';
      }

      function getReservationStatusDisplayName(status) {
        if (status == 1) {
          return '已预约';
        }

        if (status == 2) {
          return '火化中';
        }

        if (status == 3) {
          return '已出炉';
        }

        if (status == 4) {
          return '已取灰';
        }

        return '-';
      }

      // Method to refresh or flip page
      function refreshOrFlipPage() {
        const pageInfo = getPaginationRef();
        const pageSize = pageInfo.pageSize || pageInfo.defaultPageSize;
        if (pageInfo.current * pageSize >= pageInfo.total) {
          setPagination({
            current: 1,
          }); // Go to the first page if on the last page
        } else {
          setPagination({
            current: pageInfo.current + 1,
          }); // Go to the next page
        }
        reload();
      }

      //初始化语音插件 - init内可以全部为空 - 自定义
      speech
        .init({
          volume: 1, // 音量
          lang: 'zh-CN', // 语言
          rate: 1, // 语速
          pitch: 1, // 音调
          splitSentences: true, // 在句子结束时暂停
          listeners: {
            // 事件
            onvoiceschanged: (voices) => {
              console.log('事件声音已更改', voices);
            },
          },
        })
        .then((data) => {
          console.log('语音已准备好，声音可用', data);
        })
        .catch((e) => {
          console.error('初始化时发生错误 : ', e);
        });
      //语音播报按钮
      function voice() {
        speech
          .speak({
            text: '测试语音！测试语音！请逝者小明的亲属到窗口领灰！', //这里使用文字或者i18n 都可以 看自己需求
          })
          .then(() => {
            console.log('Success !');
          })
          .catch((e) => {
            console.error('An error occurred :', e);
          });
      }

      return {
        currentTime,
        registerTable,
        getSexDisplayName,
        getReservationStatusDisplayName,
        dateUtil,
        Button,
        voice,
      };
    },
  });
</script>
