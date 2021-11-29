const { MessageAttachment } = require('discord.js');
const Table = require('./../utils/table.js');
module.exports = {
  name: 'list',
	async execute(msg, db) {
if(msg.user.id != process.env.owner_id)return msg.reply({ embeds: [{ description: 'You Don\'t Have Permission To Run This Command', color: '#e83838' }], ephemeral: true });
    const data = await db.list();
    if(!data[0])return await msg.reply({ embeds: [{ description: 'Database Was Empty', color: '#e83838' }], ephemeral: true });

  var table = new Table({
    head: ['Slug', 'URL', 'Created By'],
    borders: true
  });
    for(i in data){
      table.push([
        `${data[i].split('/')[0]}`, `${await db.get(data[i])}`, `${data[i].split('/')[1]}`
      ]);
    }


    await msg.reply({ files: [new MessageAttachment(Buffer.from(`${table.toString()}`, 'utf-8'), 'list.txt')]})
	},
};
