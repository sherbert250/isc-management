package isc.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import isc.IdealSeatingPortType;

@Controller
public class SampleController {
	
	@Autowired
	IdealSeatingPortType service;
	
	@ResponseBody
	@RequestMapping(value="/hello", method = RequestMethod.GET)
	public String sampleRequest() {
		String returnFromService = service.sampleRequest("yolo");
		return returnFromService;
	}
	
	@RequestMapping("/")
	public String index(){
		return "index";
	}
}
