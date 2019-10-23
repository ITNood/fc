<template>
  <div>
    <Top :title="msg" />
    <div class="layout" style="margin-bottom:20px;">
        <div class="takeout">
            <ul>
                <li v-for="(item,index) in items" :key="index">
                    <p>{{item.date}}</p>
                    <span>{{item.name}}</span>
                    <h5>-{{item.amount}}</h5>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
import Top from "../../../../components/top";
export default {
  components: { Top },
  data() {
    return {
        msg:'取出记录',
        items:[
            {date:'2019/10/23 15:00',name:'取出薪酬',amount:1000}
        ]
    };
  }
};
</script>

<style scoped>
</style>
