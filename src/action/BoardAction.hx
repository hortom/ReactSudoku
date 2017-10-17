package action;

/**
 * ...
 * @author Tamas Hortobagyi
 */

 /**
	Redux actions to dispatch from views and match in reducer/middleware
**/
enum BoardAction
{
	RndFill;
	Set(id:Int, value:Int);
}