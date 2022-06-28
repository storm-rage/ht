<template>
    <div class="org-tree-container">
        <div class="org-tree" :class="{horizontal, collapsable}">
            <org-tree-node
                    :data="data"
                    :props="props"
                    :horizontal="horizontal"
                    :label-width="labelWidth"
                    :collapsable="collapsable"
                    :render-content="renderContent"
                    :label-class-name="labelClassName"
                    :selected-class-name="selectedClassName"
                    :selected-key="selectedKey"
                    @on-expand="(e, data) => $emit('on-expand', e, data)"
                    @on-pdf="(e, data) => $emit('on-pdf', data)"
                    @on-node-focus="(e, data) => $emit('on-node-focus', e, data)"
                    @on-node-click="(e, data) => $emit('on-node-click', e, data)"
                    @on-node-mouseover="(e, data) => $emit('on-node-mouseover', e, data)"
                    @on-node-mouseout="(e, data) => $emit('on-node-mouseout', e, data)"
            />
        </div>
    </div>
</template>

<script>
    import render from './node'
    export default {
        name: 'tree',
        components: {
            OrgTreeNode: {
                render,
                functional: true
            }
        },
        props: {
            data: {
                type: Object,
                required: true
            },
            props: {
                type: Object,
                default: () => ({
                    parentCode: 'parentCode',
                    label: 'label',
                    ebillCode: 'ebillCode',
                    ebillAmt: 'ebillAmt',
                    tranType: 'tranType',
                    holderDate: 'holderDate',
                    writerName: 'writerName',
                    agreements: 'agreements',
                    expand: 'expand',
                    children: 'children'
                })
            },
            horizontal: Boolean,
            selectedKey: String,
            collapsable: Boolean,
            renderContent: Function,
            labelWidth: [String, Number],
            labelClassName: [Function, String],
            selectedClassName: [Function, String]
        }
    }
</script>

<style lang="less" src="./index.less"></style>
<style lang="less" src="./tree.less"></style>
