<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Activities extends Controller {

	public function action_index($id = null)
	{

		$response = Request::factory("http://dummyserv/activities/".$id)
			->method("GET")
			->execute()
			->body();
		
		$activity = json_decode($response, TRUE);
		$body = "<pre>".print_r($activity, TRUE)."</pre>";
		$this->response->body($body);
		
	}


	
} // End Activity
