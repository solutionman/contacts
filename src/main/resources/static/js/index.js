Ext.define('MyApp.view.Main', {
    extend: 'Ext.Viewport',

    layout: 'fit',

    initComponent: function () {
        var me = this;

        me.items = [{
			xtype : 'panel',
			bodyStyle : 'background-color:blue'
		}];

        me.callParent(arguments);
	}

});

Ext.application({
    name: 'Fiddle',

    autoCreateViewport: 'MyApp.view.Main'
   
});