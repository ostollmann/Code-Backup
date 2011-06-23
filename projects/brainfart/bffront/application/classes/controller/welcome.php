<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Welcome extends Controller {

	public function action_index()
	{

		$POST_request = Request::factory("http://dummyserv/info/")
			->method("POST")
			->post("last_name", "stollmann")
			->post("first_name", "oliver");

		$PUT_request = Request::factory("http://dummyserv/info/")
			->method("PUT")
			->post("last_name", "stollmann")
			->post("first_name", "oliver");
		
		$GET_request = Request::factory("http://dummyserv/info/")
			->method("GET");
		
		$body = "";
		$body .= $GET_request->execute()->body();
		$body .= $PUT_request->execute()->body();
		$body .= $POST_request->execute()->body();
				
		$this->response->body($body);
		
	}

} // End Welcome
