Ext.define('KitchenSink.model.Customer', {
    extend: 'Ext.data.Model',
    requires: [
        "KitchenSink.model.field.PhoneNumber"
    ],
    
    fields: [
        'name',
        { name: 'phone', type: 'phonenumber' }
    ],

    proxy: {
        type: 'rest',
        url: '/KitchenSink/Customer'
    },

    validators: {
        name: { type: 'length', min: 1 }
    }
});
