<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Welcome extends Controller {

	public function action_index()
	{
		$this->request->response = 'hello, world!';
		$this->request->response .= '<br /> actually: <strong>fuck you</strong>, world!';

	}

} // End Welcome
