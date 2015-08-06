var DomHelp;
(function (DomHelp) {
    /**
     * given an x and y position, get the cell on the map
     *
     * @param {number} x coordinate
     * @param {number} y coordinate
     */
    function getMapCell($rows, x, y) {
        return $($($rows[y]).children('.map-cell')[x]);
    }
    DomHelp.getMapCell = getMapCell;
})(DomHelp || (DomHelp = {}));
