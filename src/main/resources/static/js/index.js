Ext.define('Writer.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.writerform',

    requires: ['Ext.form.field.Text'],

    initComponent: function() {
        Ext.apply(this, {
            activeRecord: null,
            iconCls: 'icon-user',
            frame: true,
            title: 'User -- All fields are required',
            defaultType: 'textfield',
            bodyPadding: 5,
            fieldDefaults: {
                anchor: '100%',
                labelAlign: 'right'
            },
            items: [{
                fieldLabel: 'Name',
                name: 'name',
                allowBlank: false,
            }, {
                fieldLabel: 'Family Name',
                name: 'family',
                allowBlank: false
            }, {
                fieldLabel: 'Phone Number',
                name: 'phone',
                allowBlank: false,
                placeholder: '+7 (xxx) xxx-xx-xx',
                inputMask: '+7 (999) 999-99-99'
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'icon-save',
                    itemId: 'save',
                    text: 'Save',
                    disabled: true,
                    scope: this,
                    handler: this.onSave
                }, {
                    iconCls: 'icon-user-add',
                    text: 'Create',
                    scope: this,
                    handler: this.onCreate
                }, {
                    iconCls: 'icon-reset',
                    text: 'Reset',
                    scope: this,
                    handler: this.onReset
                }]
            }]
        });
        this.callParent();
    },

    setActiveRecord: function(record) {
        this.activeRecord = record;

        if (record) {
            this.down('#save').enable();
            this.getForm().loadRecord(record);
        }
        else {
            this.down('#save').disable();
            this.getForm().reset();
        }
    },

    onSave: function() {
        var active = this.activeRecord,
            form = this.getForm();

        if (!active) {
            return;
        }

        if (form.isValid()) {
            form.updateRecord(active);
            this.onReset();
        }
    },

    onCreate: function() {
        var form = this.getForm();

        if (form.isValid()) {
            this.fireEvent('create', this, form.getValues());
            form.reset();
        }

    },

    onReset: function() {
        this.setActiveRecord(null);
        this.getForm().reset();
    }
});

Ext.define('Writer.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.writergrid',

    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],

    initComponent: function() {
        Ext.apply(this, {
            iconCls: 'icon-grid',
            frame: true,
            plugins: {
                cellediting: true,
                rowexpander: {
                    rowBodyTpl: new Ext.XTemplate( '<p>+7 (333) 333-33-33</p>' )
                }
            },
            // itemConfig: {
            //     body: {
            //         tpl: '<img height="100" src="http://www.sencha.com/assets/images/sencha-avatar-64x64.png"/>'
            //     }
            // },
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    iconCls: 'icon-add',
                    text: 'Add',
                    scope: this,
                    handler: this.onAddClick
                }, {
                    iconCls: 'icon-delete',
                    text: 'Delete',
                    disabled: true,
                    itemId: 'delete',
                    scope: this,
                    handler: this.onDeleteClick
                }]
            }, {
                weight: 2,
                xtype: 'toolbar',
                dock: 'bottom',
                items: [{
                    xtype: 'tbtext',
                    text: '<b>@cfg</b>'
                }, '|', {
                    text: 'autoSync',
                    enableToggle: true,
                    pressed: true,
                    tooltip: 'When enabled, Store will execute Ajax requests as soon as a Record becomes dirty.',
                    scope: this,
                    toggleHandler: function(btn, pressed) {
                        this.store.autoSync = pressed;
                    }
                }, {
                    text: 'batch',
                    enableToggle: true,
                    pressed: true,
                    tooltip: 'When enabled, Store will batch all records for each type of CRUD verb into a single Ajax request.',
                    scope: this,
                    toggleHandler: function(btn, pressed) {
                        this.store.getProxy().batchActions = pressed;
                    }
                }, {
                    text: 'writeAllFields',
                    enableToggle: true,
                    pressed: false,
                    tooltip: 'When enabled, Writer will write *all* fields to the server -- not just those that changed.',
                    scope: this,
                    toggleHandler: function(btn, pressed) {
                        this.store.getProxy().getWriter().writeAllFields = pressed;
                    }
                }]
            }, {
                weight: 1,
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'icon-save',
                    text: 'Sync',
                    scope: this,
                    handler: this.onSync
                }]
            }],
            columns: [{
                text: 'ID',
                width: 40,
                sortable: true,
                resizable: false,
                draggable: false,
                hideable: false,
                menuDisabled: true,
                dataIndex: 'id',
                renderer: function(value) {
                    return Ext.isNumber(value) ? value : '&nbsp;';
                }
            }, {
                header: 'Name',
                flex: 1,
                sortable: true,
                dataIndex: 'name',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Family name',
                width: 100,
                sortable: true,
                dataIndex: 'family',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Phone',
                width: 100,
                sortable: true,
                dataIndex: 'phone',
                field: {
                    type: 'textfield'
                }
            }]
        });
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },

    onSelectChange: function(selModel, selections) {
        this.down('#delete').setDisabled(selections.length === 0);
    },

    onSync: function() {
        this.store.sync();
    },

    onDeleteClick: function() {
        var selection = this.getView().getSelectionModel().getSelection()[0];

        if (selection) {
            this.store.remove(selection);
        }
    },

    onAddClick: function() {
        // eslint-disable-next-line no-undef
        var rec = new Writer.Person({
                name: '',
                family: '',
                phone: ''
            }),
            edit = this.findPlugin('cellediting');

        edit.cancelEdit();
        this.store.insert(0, rec);
        edit.startEditByPosition({
            row: rec,
            column: 1
        });
    }
});

Ext.define('Writer.Person', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'name', 'family', 'phone'],
    validators: {
        name: {
            type: 'length',
            min: 1
        },
        family: {
            type: 'length',
            min: 1
        },
        phone: {
            type: 'length',
            min: 1
        }
    }
});

Ext.require([
    'Ext.data.*',
    'Ext.tip.QuickTipManager',
    'Ext.window.MessageBox'
]);

Ext.onReady(function() {
    var didReset, o, store, main;

    Ext.tip.QuickTipManager.init();

    Ext.create('Ext.button.Button', {
        margin: '0 0 20 20',
        text: 'Reset sample database back to initial state',
        renderTo: document.body,
        tooltip: 'The sample database is stored in the session, including any changes you make. Click this button to reset the sample database to the initial state',
        handler: function() {
            Ext.getBody().mask('Resetting...');
            Ext.Ajax.request({
                url: '/reset',
                callback: function(options, success, response) {
                    Ext.getBody().unmask();

                    didReset = true;

                    if (success) {
                        try {
                            o = Ext.decode(response.responseText);
                            didReset = o.success === true;
                        }
                        catch (e) {
                            didReset = false;
                        }
                    }
                    else {
                        didReset = false;
                    }

                    if (didReset) {
                        store.load();
                        main.down('#form').setActiveRecord(null);
                        Ext.example.msg('Reset', 'Reset successful');
                    }
                    else {
                        Ext.MessageBox.alert('Error', 'Unable to reset example database');
                    }

                }
            });
        }
    });

    store = Ext.create('Ext.data.Store', {
        model: 'Writer.Person',
        autoLoad: true,
        autoSync: true,
        proxy: {
            type: 'ajax',
            api: {
                read: '/view',
                create: '/create',
                update: '/update',
                destroy: '/destroy'
            },
            reader: {
                type: 'json',
                successProperty: 'success',
                root: 'data',
                messageProperty: 'message'
            },
            writer: {
                type: 'json',
                writeAllFields: false,
                root: 'data'
            },
            listeners: {
                exception: function(proxy, response, operation) {
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            }
        },
        listeners: {
            write: function(proxy, operation) {
                if (operation.action === 'destroy') {
                    main.child('#form').setActiveRecord(null);
                }
                console.log(operation.action);
                console.log(operation.getResultSet().message);
                Ext.Msg.alert(operation.action, operation.getResultSet().message);
            }
        }
    });

    main = Ext.create('Ext.container.Container', {
        padding: '0 0 0 20',
        width: 500,
        height: Ext.themeName === 'neptune' ? 700 : 650,
        renderTo: document.body,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            itemId: 'form',
            xtype: 'writerform',
            manageHeight: false,
            margin: '0 0 10 0',
            listeners: {
                create: function(form, data) {
                    store.insert(0, data);
                }
            }
        }, {
            itemId: 'grid',
            xtype: 'writergrid',
            title: 'User List',
            flex: 1,
            store: store,
            listeners: {
                selectionchange: function(selModel, selected) {
                    main.child('#form').setActiveRecord(selected[0] || null);
                }
            }
        }]
    });
});
