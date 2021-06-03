import { sortBy, uniqWith, reverse, drop } from 'lodash'

function checkTreeNode(info) {

    let k = info.eventKey
    let arr = k.split('-');

    let checkedKeys = [...info.checkedKeys]
    let halfCheckedKeys = [...info.halfCheckedKeys]

    if (info.checked || info.halfChecked) {
        // 从半选中移除自己，选中添加自己
        if (info.halfChecked) {
            halfCheckedKeys = halfCheckedKeys.filter(it => {
                return it !== k
            })
            checkedKeys.push(k)
        }
        // 选中，联动勾选所有父级节点(半选)
        while (arr.length > 2) {
            arr.splice(-1, 1);
            let join = arr.join('-');
            halfCheckedKeys.push(join);
            checkedKeys = checkedKeys.filter(it => it !== join)
        }

        // 取消子节点选中
        checkedKeys = checkedKeys.filter(it => it === k || it.indexOf(k) !== 0)
        halfCheckedKeys = halfCheckedKeys.filter(it => it.indexOf(k) !== 0)
    } else {
        // 取消选中，联动取消子节点(包含自己)
        checkedKeys = checkedKeys.filter((it) => {
            // 过滤掉不是选中节点key开头的
            return it.indexOf(k) !== 0
        })
        while (arr.length > 2) {
            arr.splice(-1, 1);
            let join = arr.join('-');
            let one = checkedKeys.find(it => {
                return it.indexOf(join) === 0 && it !== join
            })
            if (!one) {
                halfCheckedKeys = halfCheckedKeys.filter(it => {
                    return it !== join
                })
            }
        }
    }
    // 去重复key
    let c = new Set(checkedKeys)
    checkedKeys = Array.from(c)

    let hc = new Set(halfCheckedKeys)
    halfCheckedKeys = Array.from(hc)
    return {
        checkedKeys,
        halfCheckedKeys
    }
}

function getLeafCheckedKeys(checkedKeys) {
    return uniqWith(reverse(sortBy(checkedKeys, it => it.length)), (t1, t2) => {
        if (t1.length > t2.length) {
            return t1.indexOf(t2) === 0
        } else {
            return t2.indexOf(t1) === 0
        }
    })
}

function getDataByCheckedKeys(checkedKeys, treeData) {
    const data = []
    for (const k of checkedKeys) {
        const kis = drop(k.split('-'))
        if (kis.length === 1) {
            data.push({ title: treeData[kis[0]].title })
        } else if (kis.length === 2) {
            const d1 = data.find(it => it.title === treeData[kis[0]].title)
            if (d1) {
                if (!d1.children) {
                    d1.children = [];
                }
                d1.children.push({
                    title: treeData[kis[0]].children[kis[1]].title
                })
            } else {
                data.push({
                    title: treeData[kis[0]].title,
                    children: [{ title: treeData[kis[0]].children[kis[1]].title }]
                })
            }
        } else if (kis.length === 3) {
            const d1 = data.find(it => it.title === treeData[kis[0]].title)
            if (d1) {
                if (!d1.children) {
                    d1.children = [];
                }
                const d2 = d1.children.find(it => it.title === treeData[kis[1]].title)
                if (d2) {
                    if (!d2.children) {
                        d2.children = [];
                    }
                    d2.children.push({
                        title: treeData[kis[0]].children[kis[1]].children[kis[2]].title
                    })
                } else {
                    d1.children.push({
                        title: treeData[kis[0]].children[kis[1]].title,
                        children: [{ title: treeData[kis[0]].children[kis[1]].children[kis[2]].title }]
                    })
                }
            } else {
                data.push({
                    title: treeData[kis[0]].title,
                    children: [{
                        title: treeData[kis[0]].children[kis[1]].title,
                        children: [{ title: treeData[kis[0]].children[kis[1]].children[kis[2]].title }]
                    }]
                })
            }
        }

    }
    return data
}

export {
    checkTreeNode,
    getLeafCheckedKeys,
    getDataByCheckedKeys
}