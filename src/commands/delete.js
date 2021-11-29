module.exports = {
  name: 'delete',
	async execute(msg, db) {
 if(msg.user.id != process.env.owner_id)return msg.reply({ embeds: [{ description: 'You Don\'t Have Permission To Run This Command', color: '#e83838' }], ephemeral: true });
   
    var slug = msg.options.getString('slug');
    if(!msg?.member?.roles.includes('903941355674402817'))return await msg.reply({ embeds: [{ description: 'You Don\'t Have Permission To Run This Command', color: '#e83838' }], ephemeral: true });
    if(!slug)return await msg.reply({ embeds: [{ description: 'Something Went Wrong', color: '#e83838' }], ephemeral: true });

    var datas = await db.list();
      var data;
    for(e of datas) {
     if(e.startsWith(`${slug}`)) {
       data = (await db.get(e));
       slug = e;
     }
      }   
       if(!data)return await msg.reply({ embeds: [{ description: 'Slug Does Not Exist', color: '#e83838' }], ephemeral: true });

    await db.delete(`${slug}`).then(async () => {
      await msg.reply({
        embeds: [{
          title: 'Deleted !',
          description: `**Slug:** \`${slug.split('/')[0]}\`\n**URL:** \`${data}\`\n**Created By:** \`${slug.split('/')[1]}\``,
          color: '#03fc2c'
        }]
      })
    })
	},
};
