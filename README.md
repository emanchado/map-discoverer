Map discoverer
==============

This is a very simple web tool to "discover" maps. The main usecase is
pen-and-paper role-playing games, in which you want to show a map but
piece by piece, as the characters explore it.

The idea is: the narrator loads a map (say, in a laptop or a tablet)
and selects which parts of the map should be shown first. Then,
toggles full opacity so that only the uncovered parts show. Now the
laptop or tablet can be shown to the players, which will only see the
parts the narrator wants. As they explore the map, the narrator can
get the tablet, toggle partial opacity, uncover a bit more of the map,
toggle full opacity again and show the result to the players.

You can download the code and make modifications, or simply [use it
online](http://emanchado.github.io/map-discoverer).

TODO
----

* In stopTool a snapshot of the current canvas would be taken, for
  undo purposes. Add undo option.
* Add UI hints, like the size of the current rectangle. Change the
  cursor shape.
* Add size of pencil.
