exports.up = (pgm) => {
    pgm.createTable("topic1", {
      id: "id",
      event_data: { type: "jsonb", notNull: true },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable("topic1");
  };
  

  exports.up = (pgm) => {
    pgm.createTable('topic2', {
      id: 'id',
      event_data: { type: "jsonb", notNull: true },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('topic2');
  };
  

  exports.up = (pgm) => {
    pgm.createTable('topic3', {
      id: 'id',
      event_data: { type: "jsonb", notNull: true },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('topic3');
  };
  