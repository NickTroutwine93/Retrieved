Will be replaced when generated: https://nicktroutwine93.github.io/Retrieved/


<strong>Note To Self</strong>
For git hub pages deployment delete build folder. In console run "npm run build" then "npm run predeploy" then can run "npm run deployment".
<p>To run in general npm start dev</p>


Notes to self for parsing list:
function builtTile(record) {
  return (
    <li><b>{record.pet}:</b> </li>
  );
}

let App = function Gallery() {
  const listItems = records.map(record =>
    builtTile(record)
  );
  return <div>{listItems}</div>;

}


Dependencies to explore:<br>
Venmo Business Integration<br>
Google maps <br>
https://elixir.com/ for messaging or firebase or twilo or socket.io(Better for production maybe?)
https://www.reddit.com/r/reactnative/comments/134f7gp/whats_the_easiest_way_to_implement_a_chat_system/
