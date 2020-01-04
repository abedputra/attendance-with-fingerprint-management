<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Location extends CI_Controller {

    public $status;
    public $roles;

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->model('User_model', 'user_model', TRUE);
        $this->load->library('form_validation');
        $this->form_validation->set_error_delimiters('<div class="error">', '</div>');
        $this->status = $this->config->item('status');
        $this->roles = $this->config->item('roles');
        $this->load->library('userlevel');
    }

    public function settingLoc()
    {
        //user data from session
        $data = $this->session->userdata;
        if(empty($data)){
            redirect(site_url().'main/login/');
        }

        //check user level
        if(empty($data['role'])){
            redirect(site_url().'main/login/');
        }
        $dataLevel = $this->userlevel->checkLevel($data['role']);
        //check user level

        $data['title'] = "Settings Your Office Area";

        if(empty($this->session->userdata['email'])){
            redirect(site_url().'main/login/');
        }else{
            $this->load->view('header', $data);
            $this->load->view('navbar', $data);
            $this->load->view('container');
            $this->load->view('location', $data);
            $this->load->view('footer');
        }
    }
}