 <template>
  <el-dropdown
    @visible-change="params.dropdownChange"
    @command="(type)=>params.dealAction(type,params.data)"
  >
    <span class="el-dropdown-link">
      <span class="font12">操作列表</span>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="confirm">告警确认</el-dropdown-item>
      <el-dropdown-item command="delete">告警清除</el-dropdown-item>
      <el-dropdown-item command="mark">告警备注</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'alarmTableAction',
  data () {
    return {
      isChecked: false,
      isReadonly: false
    }
  },
  methods: {
    refresh () {}
  }
})
</script>
<style lang="scss" scoped>
.font12{
   font-size: 12px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>
