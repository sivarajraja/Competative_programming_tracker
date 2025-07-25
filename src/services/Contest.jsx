const username = "shivaa11";
const apiKey = "4dcb14d47515957a347f5564abe5537dad0fd45a";

fetch("https://clist.by/api/v2/contest/?start__gte=now&order_by=start", {
  headers: {
    Authorization: `ApiKey ${username}:${apiKey}`,
  },
})
  .then((res) => res.json())
  .then((data) => console.log(data));
