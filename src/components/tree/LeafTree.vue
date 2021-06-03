<script>
// import {Tree} from 'ant-design-vue'
import Tree from 'ant-design-vue/lib/tree'
import 'ant-design-vue/lib/tree/style/css'
import { checkTreeNode } from './LeafTreeUtil'

let tree = {
  name: 'LeafTree',
  extends: Tree,

  mounted () {
    let srcCheck = this.$listeners.check
    this.$listeners.check = function (checkedKeys, e) {
      const info = checkTreeNode({
        eventKey: e.node.eventKey,
        checked: e.checked,
        halfChecked: e.node.halfChecked,
        checkedKeys: checkedKeys.checked,
        halfCheckedKeys: checkedKeys.halfChecked,
      });
      checkedKeys.checked = info.checkedKeys;
      checkedKeys.halfChecked = info.halfCheckedKeys;
      if (srcCheck) {
        srcCheck(checkedKeys, e)
      }
    }
  }
};
export default tree;
</script>