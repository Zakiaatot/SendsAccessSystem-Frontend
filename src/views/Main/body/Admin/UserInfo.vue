<template>
    <h1 class="title">用户信息</h1>
    <a-table :columns="columns" :data="userdata" class="datatable" page-position="top" :loading="tableloading">
        <template #optional="{ record }">
            <a-button type="text" status="warning" @click="openupdateuserform(record.name, record.uid)">
                <template #icon>
                    <icon-edit size="20px" />
                </template>
            </a-button>
            <a-button type="text" status="danger" @click="deleteuserconfirm(record.name)">
                <template #icon>
                    <icon-delete size="20px" />
                </template>
            </a-button>
        </template>
        <template #footer>
            <footer class="table-footer">
                <a-button type="text" @click="openinsertuserform">
                    <template #icon>
                        <icon-plus-circle size="20px" />
                    </template>
                </a-button>
            </footer>
        </template>
    </a-table>


    <a-modal v-model:visible="insertformvisible" title="Insert New User" @cancel="closeinsertuserform"
        @before-ok="insertconfirmsubmit" width="370px" :closable="false" :mask-closable="false">
        <a-form :model="insertuserform" ref="insertuserformRef" layout="vertical"
            class="animate__animated animate__bounceIn">
            <a-form-item field="name" label="Name" :rules="rules.name">
                <a-input v-model="insertuserform.name" allow-clear placeholder="E.g: 张三" />
            </a-form-item>
            <a-form-item field="uid" label="Uid" :rules="rules.uid">
                <a-input v-model="insertuserform.uid" allow-clear placeholder="E.g: 97:0B:11:D8" />
            </a-form-item>
        </a-form>
    </a-modal>

    <a-modal v-model:visible="updateformvisible" title="Update User Information" @cancel="closeupdateuserform"
        @before-ok="updateconfirmsubmit" width="370px" :closable="false" :mask-closable="false">
        <a-form :model="updateuserform" ref="updateuserformRef" layout="vertical"
            class="animate__animated animate__bounceIn">
            <a-form-item field="name" label="Name" :rules="rules.name">
                <a-input v-model="updateuserform.name" allow-clear placeholder="E.g: 张三" />
            </a-form-item>
            <a-form-item field="uid" label="Uid" :rules="rules.uid">
                <a-input v-model="updateuserform.uid" allow-clear placeholder="E.g: 97:0B:11:D8" />
            </a-form-item>
        </a-form>
    </a-modal>

</template>

<script setup>
import { showalluser, insertuser, deleteuser, updateuser } from '../../../../axios'
import { Notification, Modal } from '@arco-design/web-vue'
import { onMounted, reactive, ref } from 'vue'
import uidchange from '../../../../utils/uidchange.js'
import { IconEdit, IconDelete, IconPlusCircle } from '@arco-design/web-vue/es/icon'
// get data
const columns = [
    {
        title: "Name",
        dataIndex: "name"
    },
    {
        title: "Uid",
        dataIndex: "uid"
    },
    {
        title: 'Optional',
        slotName: 'optional'
    }
]
const userdata = reactive([])
const tableloading = ref(true)
const getdata = async (openmsg) => {
    openmsg = openmsg || false
    const result = await showalluser()
    if (result.code === 0) Notification.error(result.msg.message ? result.msg.message : result.msg)
    else {
        userdata.length = 0
        for (let i = 0, length = result.msg.length; i < length; i++) {
            result.msg[i].uid = uidchange.toHex(result.msg[i].uid)
            userdata[i] = result.msg[i]
        }
        if (openmsg)
            Notification.success({ content: '获取用户数据成功', position: 'bottomRight' })
    }
}
onMounted(() => {
    setTimeout(async () => {
        await getdata(true)
        tableloading.value = false
    }, 1000);
})

//insert
const insertuserform = reactive({
    name: '',
    uid: ''
})
const insertuserformRef = ref()
const rules = {
    name: [{ required: true, message: "Name is Required" }],
    uid: [{ required: true, message: "Uid is Required" }, { match: /^([0-9a-fA-F]{2}[:]{1}){3}[0-9a-fA-F]{2}$/, message: "Uid is incorrect" }]
}
const insertformvisible = ref(false)
const openinsertuserform = () => {
    insertformvisible.value = true
}
const closeinsertuserform = () => {
    insertformvisible.value = false
}
const resetinsertuserform = () => {
    insertuserform.name = ''
    insertuserform.uid = ''
}
const insertconfirmsubmit = async (done) => {
    const validate = await insertuserformRef.value.validate()
    if (validate) return done(false)
    const result = await insertuser(
        {
            name: insertuserform.name,
            uid: uidchange.toDec(insertuserform.uid)
        }
    )
    if (result.code === 0) return Notification.error(result.msg), done(false)
    return Notification.success(result.msg), done(), getdata(), resetinsertuserform()
}

//delete
const warning = (title, content, onBeforeOk) => {
    Modal.warning({
        title,
        content,
        width: '300px',
        hideCancel: false,
        maskClosable: false,
        onBeforeOk,
        modalStyle: { 'text-align': 'center' }
    })
}
let deleteusername = ''
const deleteuserconfirm = (name) => {
    warning("Delete", "确认要删除用户：" + name + " ?", deleteuserBeforeOK)
    deleteusername = name
}
const deleteuserBeforeOK = async (done) => {
    const result = await deleteuser({ name: deleteusername })
    if (result.code === 0) return Notification.error(result.msg), done(false)
    return Notification.success(result.msg), done(), getdata()
}


//update
const updateuserform = reactive({
    name: '',
    uid: '',
    recordname: '',
    recorduid: ''
})
const updateuserformRef = ref()
const updateformvisible = ref(false)
const openupdateuserform = (name, uid) => {
    updateformvisible.value = true
    updateuserform.name = name
    updateuserform.uid = uid
    updateuserform.recordname = name
    updateuserform.recorduid = uid
}
const closeupdateuserform = () => {
    updateformvisible.value = false
    resetupdateuserform()
}
const resetupdateuserform = () => {
    updateuserform.name = ''
    updateuserform.uid = ''
    updateuserform.recordname = ''
    updateuserform.recorduid = ''
}
const updateconfirmsubmit = async (done) => {
    const validate = await updateuserformRef.value.validate()
    if (updateuserform.name === updateuserform.recordname && updateuserform.uid === updateuserform.recorduid) {
        return Notification.error('未作出任何更改'), done(false)
    }
    if (validate) return done(false)
    const result = await updateuser({
        new: {
            name: updateuserform.name,
            uid: uidchange.toDec(updateuserform.uid)
        },
        old: {
            name: updateuserform.recordname
        }
    })
    if (result.code === 0) return Notification.error(result.msg), done(false)
    return Notification.success(result.msg), done(), getdata(), resetupdateuserform()

}



</script>

<style scoped>
.datatable {
    width: 370px;
    margin: 40px auto;
}

.table-footer {
    text-align: center;
}

.title {
    text-align: center;
    color: var(--color-text-1);
}

:deep(.arco-table-footer) {
    padding: 3px 0;
}
</style>