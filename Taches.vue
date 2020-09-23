<template>
    <q-page class="column">
        <div class="row q-pa-sm">
            <q-input
                @keyup.enter="addTask(this)"
                v-model="defaultTaskTitle"
                class="col"
                square
                filled
                label="Ajouter une tâche"
                label-color="grey-7"
                dense
            >
                <template v-slot:append>
                    <q-btn @click="addTask" dense flat icon="add" round />
                </template>
            </q-input>
        </div>

        <q-list class="row justify-around" style="margin-left: 35px">
            <q-item v-for="(task, index) in tasks" :key="task.title">
                <q-card :class="{ 'done bg-blue-1': task.done }">
                    <q-card-section>
                        <div>
                            <h5 style="text-align: center">{{ task.title }}</h5>
                        </div>
                    </q-card-section>

                    <q-card-section side>
                        <q-checkbox color="primary" v-model="task.done" />
                    </q-card-section>

                    <q-card-section side>
                        <q-btn
                            @click.stop="deleteTask(index)"
                            flat
                            dense
                            round
                            color="primary"
                            icon="delete"
                        />
                    </q-card-section>

                    <q-card-actions>
                        <q-input
                            v-if="!task.done"
                            v-model="task.defaultSubtaskTitle"
                            :key="index"
                            @keyup.enter="addSubtask(index)"
                            class="col"
                            square
                            filled
                            label="Sous-tâche"
                            label-color="grey-7"
                            dense
                        >
                            <template v-slot:append>
                                <q-btn
                                    @click="addSubtask(index)"
                                    dense
                                    flat
                                    icon="add"
                                    round
                                />
                            </template>
                        </q-input>
                    </q-card-actions>

                    <q-separator />

                    <q-card-section v-if="tasks.length">
                        <q-list>
                            <q-item
                                :class="{ 'done bg-blue-1': small.done }"
                                :key="small.title"
                                clickable
                                v-for="(small, index) in tasks[index].children"
                                v-ripple
                            >
                                <q-item-section>
                                    <div>{{ small.title }}</div>
                                </q-item-section>

                                <q-item-section side>
                                    <q-checkbox
                                        color="primary"
                                        v-if="!task.done"
                                        v-model="small.done"
                                    />
                                </q-item-section>

                                <q-item-section side>
                                    <q-btn
                                        @click.stop="
                                            deleteSubTask(index, small.parent)
                                        "
                                        color="primary"
                                        dense
                                        flat
                                        icon="delete"
                                        round
                                    />
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>
                </q-card>
            </q-item>
        </q-list>
        <div v-if="!tasks.length" class="no-tasks absolute-center">
            <q-icon color="info" name="check" size="100px" />
            <div class="text-h5 text-info text-center">
                Pas de tâches
            </div>
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            defaultTaskTitle: "",
            tasks: []
        };
    },
    methods: {
        deleteTask(index, parent) {
            this.$q
                .dialog({
                    title: "Confirmation",
                    message: "Voulez vous supprimer cette tâche ?",
                    cancel: true,
                    persistent: true
                })
                .onOk(() => {
                    if (!parent) {
                        this.tasks.splice(index, 1);
                    } else {
                        this.tasks[parent].children.splice(index, 1);
                    }
                    this.$q.notify("Tâche suprimée");
                });
        },
        deleteSubTask(index, parent) {
            this.tasks[parent].children.splice(index, 1);
        },

        addTask(parent) {
            this.tasks.push({
                title: this.defaultTaskTitle,
                done: false,
                defaultSubtaskTitle: "",
                children: []
            });
            this.defaultTaskTitle = "";
        },

        addSubtask(parent) {
            this.tasks[parent].children.push({
                title: this.tasks[parent].defaultSubtaskTitle,
                done: false,
                parent: parent
            });
            this.tasks[parent].defaultSubtaskTitle = "";
        }
    }
};
</script>

<style lang="scss">
.done {
    .q-item__label {
        text-decoration: line-through;
        color: #bbb;
    }
}

.no-tasks {
    opacity: 0.5;
}
</style>
