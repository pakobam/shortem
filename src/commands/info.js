module.exports = {
  name: 'info',
  execute: async (msg, db) => {
    var url = msg.options.getString('url');
    var slug = msg.options.getString('slug');

    if(!url && !slug)return await msg.reply({ embeds: [{ description: 'Please Provide A URL Or Slug', color: '#e83838' }], ephemeral: true });

    if(slug){
      var datas = await db.list();
      var data;
    for(e of datas) {
     if(e.startsWith(`${slug}`)) {
       data = (await db.get(e));
       slug = e;
     }
      }
      if(!data)return await msg.reply({ embeds: [{ description: 'This Slug Does Not Exist', color: '#e83838' }], ephemeral: true });

      await msg.reply({
        embeds: [{
          description: `**Slug:** [\`${slug.split('/')[0]}\`](https://ink.is-a.dev/${slug.split('/')[0]})\n**URL:** \`${data}\`\n**Created By:** \`${slug.split('/')[1]}\``,
          color: '#03fc2c'
        }]
      })
    }else {
      var data = await db.list();
      if(!data[0])return await msg.reply({ embeds: [{ description: 'Database Was Empty', color: '#e83838' }], ephemeral: true });
      
      var list = [];
      for(i in data){
        list.push({
          [`${await db.get(data[i])}`]: `${data[i]}`
      })
      }
  
     var find = list.find(e =>  e[`${url}`]);
     for(i in find){
       slug = find[i]
     }
     if(slug){
      await msg.reply({
       embeds: [{
          description: `**Slug:** [\`${slug.split('/')[0]}\`](https://ink.is-a.dev/${slug.split('/')[0]})\n**URL:** \`${url}\`\n**Created By:** \`${slug.split('/')[1]}\``,
          color: '#03fc2c'
        }]
      })
     }else {
    await msg.reply({ embeds: [{ description: 'This URL Does Not Exist', color: '#e83838' }], ephemeral: true });
     }
    }
  }
}
