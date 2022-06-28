<template>
	<!--（ztree－🌲）-->
	<div class="ztree_content_wrap" v-if='treeDataSource.length>0'>
		<div class="zTreeDemoBackground left">
			<ul class="ztree">
				<ztree-item v-for='(m,i) in treeDataSource' :key='i' :model.sync="m" :num.sync='i' root='0' :nodes.sync='treeDataSource.length' :callback='func' :expandfunc='expand' :cxtmenufunc='contextmenu' :trees.sync='treeDataSource'></ztree-item>
			</ul>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      treeDataSource: []
    };
  },
  props: {
    // 树数据
    list: {
      type: Array,
      twoWay: true
    },
    // 点击节点回调
    func: {
      type: Function,
      default: null
    },
    // 点击展开回调
    expand: {
      type: Function,
      default: null
    },
    // 右击事件
    contextmenu: {
      type: Function,
      default: function() {
        //console.log("defalt click contextmenu");
      }
    },
    // 是否展开
    isOpen: {
      type: Boolean,
      twoWay: true,
      default: false
    }
  },
  watch: {
    list: {
      handler: function() {
        // //console.log("value改版", this.list);
        this.initTreeData();
      },
      deep: true
    }
  },
  methods: {
    initTreeData() {
      var tempList = JSON.parse(JSON.stringify(this.list)),
        that = this;
      // //console.log("接收对象渲染")
      // 递归操作，增加删除一些属性。比如: 展开/收起
      var recurrenceFunc = data => {
        data.forEach(m => {
          if (!m.hasOwnProperty("clickNode")) {
            m.clickNode = m.hasOwnProperty("clickNode") ? m.clickNode : false;
          }

          m.children = m.children || [];
          if (!m.hasOwnProperty("isFolder")) {
            m.isFolder = m.hasOwnProperty("open") ? m.open : this.isOpen;
          }
          // 判断树是否展开
          m.isFolder = this.isOpen;

          if (!m.hasOwnProperty("isExpand")) {
            m.isExpand = m.hasOwnProperty("open") ? m.open : this.isOpen;
          }
          m.loadNode = 0;
          // recurrenceFunc(m.children);
        });
      };
      recurrenceFunc(this.list);
      this.treeDataSource = tempList;
    }
  },
  components: {
    // 组件
    ztreeItem: {
      name: "ztreeItem",
      props: {
        model: {
          type: Object,
          twoWay: true
        },
        num: {
          type: Number,
          twoWay: true
        },
        nodes: {
          type: Number,
          twoWay: true,
          default: 0
        },
        trees: {
          type: Array,
          twoWay: true,
          default: []
        },
        root: {
          type: String,
          twoWay: true
        },
        callback: {
          type: Function
        },
        expandfunc: {
          type: Function
        },
        cxtmenufunc: {
          type: Function
        }
      },
      methods: {
        Func(m) {
          // 查找点击的子节点
          var recurFunc = (data, list) => {
            data.forEach(i => {
              // 组织Id  类型Id  实例Id
              if (i.orgId == m.orgId) {
                i.clickNode = true;

                if (typeof this.callback == "function") {
                  this.callback.call(null, m, list, this.trees);
                }
              } else {
                i.clickNode = false;
              }

              if (i.children) {
                recurFunc(i.children, i);
              }
            });
          };

          recurFunc(this.trees, this.trees);
        },
        open(m) {
          //
          m.isExpand = !m.isExpand;

          if (typeof this.expandfunc == "function" && m.isExpand) {
            if (m.loadNode != 2) {
              //
              this.expandfunc.call(null, m);
            } else {
              m.isFolder = !m.isFolder;
            }
          } else {
            m.isFolder = !m.isFolder;
          }
        }
      },
      computed: {
        // 给（根 和 子树）赋值不同的样式
        rootClass() {
          var strRootClass = "";

          // 根判断
          if (this.root == "0") {
            strRootClass =
              this.num == 0 && this.model.children.length == 0
                ? "roots_docu"
                : this.nodes == 1 ||
                  (this.num == 0 && this.nodes != this.num + 1)
                  ? "root_"
                  : this.nodes == this.num + 1 ? "bottom_" : "center_";

            // 子树判断
          } else if (this.root == "1") {
            // //console.log("model:",this.model,"children:",this.model.children)
            strRootClass =
              this.nodes > 1 &&
              this.model.children.length > 0 &&
              this.nodes != this.num + 1
                ? "center_"
                : (this.num == 0 && this.nodes > 1) ||
                  this.nodes != this.num + 1
                  ? "center_docu"
                  : (this.nodes == 1 && this.num != 0) ||
                    (this.nodes == this.num + 1 &&
                      this.model.children.length > 0)
                    ? "bottom_"
                    : "bottom_docu";
          }

          return strRootClass;
        },
        // 是否有儿子节点
        isChildren() {
          return this.num + 1 != this.nodes;
        },
        // 展开/收起
        prefixClass() {
          var returnChar = "";
          if (this.rootClass.indexOf("docu") == -1) {
            if (this.model.isFolder) {
              returnChar = "open";
            } else {
              returnChar = "close";
            }
          }

          if (
            this.model.children.length == 0 &&
            this.rootClass.indexOf("docu") == -1
          ) {
            returnChar = "docu";
          }

          return returnChar;
        },
        liClassVal() {
          return "level" + this.num;
        },
        spanClassVal() {
          return (
            "button level" +
            this.num +
            " switch " +
            this.rootClass +
            this.prefixClass
          );
        },
        aClassVal() {
          return this.model.clickNode
            ? "level" + this.num + ""
            : "level" + this.num;
        },
        ulClassVal() {
          return this.isChildren && this.model.children.length > 0
            ? "level" + this.num + " line"
            : "level" + this.num;
        }
      },
      template: `<li :class="liClassVal">
				<span :class="spanClassVal" @click='open(model)'></span>
				<a :class="aClassVal" @click='Func(model)' @contextmenu.prevent='cxtmenufunc(model)'>
				    <span :class="{loadSyncNode:model.loadNode==1}" v-if='model.loadNode==1'></span>
				    <span :class='model.iconClass' v-show='model.iconClass' v-else></span>
          <el-tooltip popper-class="treetip" effect="dark" :content="model.orgName" placement="top" :open-delay="1000">
          <span class="node_name">{{model.orgName}}</span>
          </el-tooltip>
				</a>
				<ul :class="ulClassVal" v-show='model.isFolder'>
					<ztree-item v-for="(item,i) in model.children" :key='i' :callback='callback' :expandfunc='expandfunc' :cxtmenufunc='cxtmenufunc' :model.sync="item" :num.sync='i' root='1' :nodes.sync='model.children.length' :trees.sync='trees'></ztree-item>
				</ul>
			</li>`
    }
  },
  update() {
    this.initTreeData();
  },
  mounted() {
    // this.treeDataSource = this.list;
    Vue.nextTick(() => {
      this.initTreeData();
    });
    //formManageTreeSelect 流程设计 归类 tree下拉
    // $(
    //   ".grid-leftside,.el-dialog__body .el-aside .el-main,.formManageTreeSelect,.fileSelect,.editDataTreeSelect,.searchDataTreeSelect,.addDataTreeSelect,.uploadDocTreeSelect"
    // ).mCustomScrollbar({
    //   autoHideScrollbar: true,
    //   scrollButtons: {
    //     enable: true
    //   },
    //   theme: "dark",
    //   advanced: { updateOnContentResize: true }
    // });
    // $(".grid-leftside").mCustomScrollbar({
    //   axis: "yx" // vertical and horizontal scrollbar
    // });
  }
};
</script>

<style scoped>
  div.ztree_content_wrap {
    height: 100%;
    overflow-y: auto;
  }
  div.ztree_content_wrap div.left {
  }
  div.zTreeDemoBackground {
    width: 100%;
    text-align: left;
  }

  .expendIcon {
    background-position: -74px -36px;
    line-height: 0;
    margin: 0;
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    border: 0 none;
    cursor: pointer;
    outline: none;
    position: absolute;
    top: 4px;
    background-color: transparent;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-image: url("~@static/images/zTreeStandard.png");
  }
  .el-container.left .el-main {
    border: 1px solid #ddd;
    margin-right: 5px;
  }
  ul.ztree {
    /* border: 1px solid #ddd; */
    background: #ffffff;
    width: 168px;
    overflow: hidden;
  }

  .ztree * {
    padding: 0;
    margin: 0;
    font-size: 12px;
    color: #74797b;
    /* font-family: Verdana, Arial, Helvetica, AppleGothic, sans-serif; */
    font-family: Microsoft YaHei, \\5fae\8f6f\96c5\9ed1, Helvetica Neue, Helvetica,
    PingFang SC, Hiragino Sans GB, Arial, sans-serif;
  }
  .ztree {
    margin: 0;
    padding: 5px;
    color: #333;
  }
  .ztree li {
    position: relative;
    padding: 0;
    margin: 0;
    list-style: none;
    line-height: 22px;
    text-align: left;
    white-space: nowrap;
    outline: 0;
  }
  .ztree li ul {
    margin: 0;
    padding: 0 0 0 18px;
  }
  .ztree li ul.line {
    background: url("~@static/images/zTreeStyle-line.png") 4px 0 repeat-y;
  }

  .ztree li a {
    padding: 1px 3px 0 1px;
    margin: 0;
    cursor: pointer;
    height: 17px;
    color: #333;
    background-color: transparent;
    text-decoration: none;
    vertical-align: top;
    display: inline-block;
  }
  .ztree li a:hover {
    text-decoration: underline;
    color: blue;
  }
  .ztree li a.curSelectedNode {
    padding-top: 0px;
    background-color: #191d22;
    color: #fff;
    height: 22px;
    border: 1px #191d22 solid;
    opacity: 0.8;
  }
  .ztree li a.curSelectedNode_Edit {
    padding-top: 0px;
    background-color: #ffe6b0;
    color: black;
    height: 16px;
    border: 1px #ffb951 solid;
    opacity: 0.8;
  }
  .ztree li a.tmpTargetNode_inner {
    padding-top: 0px;
    background-color: #316ac5;
    color: white;
    height: 16px;
    border: 1px #316ac5 solid;
    opacity: 0.8;
    filter: alpha(opacity=80);
  }
  .ztree li a.tmpTargetNode_prev {
  }
  .ztree li a.tmpTargetNode_next {
  }
  .ztree li a input.rename {
    height: 14px;
    width: 80px;
    padding: 0;
    margin: 0;
    font-size: 12px;
    border: 1px #7ec4cc solid;
    *border: 0px;
  }
  .ztree li span {
    line-height: 16px;
    margin-right: 2px;
    top: 3px;
    display: inline-block;
  }
  .ztree li span.button {
    line-height: 0;
    margin: 0;
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    border: 0 none;
    cursor: pointer;
    outline: none;
    background-color: transparent;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-image: url("~@static/images/zTreeStandard.png");
    *background-image: url("~@static/images/zTreeStandard.gif");
  }

  .ztree li span.button.chk {
    width: 13px;
    height: 13px;
    margin: 0 3px 0 0;
    cursor: auto;
  }
  .ztree li span.button.chk.checkbox_false_full {
    background-position: 0 0;
  }
  .ztree li span.button.chk.checkbox_false_full_focus {
    background-position: 0 -14px;
  }
  .ztree li span.button.chk.checkbox_false_part {
    background-position: 0 -28px;
  }
  .ztree li span.button.chk.checkbox_false_part_focus {
    background-position: 0 -42px;
  }
  .ztree li span.button.chk.checkbox_false_disable {
    background-position: 0 -56px;
  }
  .ztree li span.button.chk.checkbox_true_full {
    background-position: -14px 0;
  }
  .ztree li span.button.chk.checkbox_true_full_focus {
    background-position: -14px -14px;
  }
  .ztree li span.button.chk.checkbox_true_part {
    background-position: -14px -28px;
  }
  .ztree li span.button.chk.checkbox_true_part_focus {
    background-position: -14px -42px;
  }
  .ztree li span.button.chk.checkbox_true_disable {
    background-position: -14px -56px;
  }
  .ztree li span.button.chk.radio_false_full {
    background-position: -28px 0;
  }
  .ztree li span.button.chk.radio_false_full_focus {
    background-position: -28px -14px;
  }
  .ztree li span.button.chk.radio_false_part {
    background-position: -28px -28px;
  }
  .ztree li span.button.chk.radio_false_part_focus {
    background-position: -28px -42px;
  }
  .ztree li span.button.chk.radio_false_disable {
    background-position: -28px -56px;
  }
  .ztree li span.button.chk.radio_true_full {
    background-position: -42px 0;
  }
  .ztree li span.button.chk.radio_true_full_focus {
    background-position: -42px -14px;
  }
  .ztree li span.button.chk.radio_true_part {
    background-position: -42px -28px;
  }
  .ztree li span.button.chk.radio_true_part_focus {
    background-position: -42px -42px;
  }
  .ztree li span.button.chk.radio_true_disable {
    background-position: -42px -56px;
  }

  .ztree li span.button.switch {
    width: 18px;
    height: 22px;
  }
  .ztree li span.button.root_open {
    background-position: -92px -53px;
  }
  .ztree li span.button.root_close {
    background-position: -74px -53px;
  }
  .ztree li span.button.roots_open {
    background-position: -92px 0;
  }
  .ztree li span.button.roots_close {
    background-position: -74px 0;
  }
  .ztree li span.button.center_open {
    background-position: -92px -17px;
  }
  .ztree li span.button.center_close {
    background-position: -74px -17px;
  }
  .ztree li span.button.bottom_open {
    background-position: -92px -36px;
  }
  .ztree li span.button.bottom_close {
    background-position: -74px -36px;
  }
  .ztree li span.button.noline_open {
    background-position: -92px -72px;
  }
  .ztree li span.button.noline_close {
    background-position: -74px -72px;
  }
  .ztree li span.button.root_docu {
    background: none;
  }
  .ztree li span.button.roots_docu {
    background-position: -56px 0;
  }
  .ztree li span.button.center_docu {
    background-position: -56px -16px;
  }
  .ztree li span.button.bottom_docu {
    background-position: -56px -36px;
  }
  .ztree li span.button.noline_docu {
    background: none;
  }

  .ztree li span.button.ico_open {
    margin-right: 2px;
    background-position: -110px -16px;
    vertical-align: top;
    *vertical-align: middle;
  }
  .ztree li span.button.ico_close {
    margin-right: 2px;
    background-position: -110px 0;
    vertical-align: top;
    *vertical-align: middle;
  }
  .ztree li span.button.ico_docu {
    margin-right: 2px;
    background-position: -110px -32px;
    vertical-align: top;
    *vertical-align: middle;
  }
  .ztree li span.button.edit {
    margin-right: 2px;
    background-position: -110px -48px;
    vertical-align: top;
    *vertical-align: middle;
  }
  .ztree li span.button.remove {
    margin-right: 2px;
    background-position: -110px -64px;
    vertical-align: top;
    *vertical-align: middle;
  }

  /*.ztree li span.button.ico_loading{margin-right:2px; background:url('../../static/images/loading.gif') no-repeat scroll 0 0 transparent;
                vertical-align:top; *vertical-align:middle}*/

  ul.tmpTargetzTree {
    background-color: #ffe6b0;
    opacity: 0.8;
    filter: alpha(opacity=80);
  }

  span.tmpzTreeMove_arrow {
    width: 16px;
    height: 16px;
    display: inline-block;
    padding: 0;
    margin: 2px 0 0 1px;
    border: 0 none;
    position: absolute;
    background-color: white;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-position: -110px -80px;
    background-image: url("~@static/images/zTreeStandard.png");
    *background-image: url("~@static/images/zTreeStandard.gif");
  }

  ul.ztree.zTreeDragUL {
    margin: 0;
    padding: 0;
    position: absolute;
    width: auto;
    height: auto;
    overflow: hidden;
    background-color: #cfcfcf;
    border: 1px #00b83f dotted;
    opacity: 0.8;
    filter: alpha(opacity=80);
  }

  .zTreeMask {
    z-index: 10000;
    background-color: #cfcfcf;
    opacity: 0;
    filter: alpha(opacity=0);
    position: absolute;
  }

  .loadSyncNode {
    width: 16px;
    height: 16px;
    position: relative;
    display: inline-block;
    background-image: url("data:image/gif;base64,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");
  }
  ul.ztree span.file {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-image: url("~@static/images/file_icon.png");
    background-repeat: no-repeat;
    float: left;
    margin: 1px 4px 0 0;
    background-position: 0 -280px;
  }
</style>
