<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Data extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->model('User_model', 'user_model', TRUE);
    }

    public function index_post()
    {
        $key = $this->input->post('key');
        $result = $this->user_model->getAllEmployee();
        $data['key'] = $result->key_insert;

        if(!empty($key)){
            if($key == $data['key']){
                // index from a data store e.g. database

                $dataLocation = $this->user_model->getLocationArea();

                $data = [
                    'message' => 'success',
                    'data' => $dataLocation
                ];

                if(count($data['data']) > 0){
                    $this->response($data, REST_Controller::HTTP_OK);
                }else{
                    $this->response(['message' => 'empty', "data" => 0], REST_Controller::HTTP_OK);
                }
                
            }else{
                $this->response(["message" => "Your key is wrong"], REST_Controller::HTTP_OK);
            }
        }else{
            $this->response(["message" => "Please insert your key first!"], REST_Controller::HTTP_OK);
        }
    }

    public function hashdata_post()
    {

        $key = $this->input->post('key');
        $result = $this->user_model->getAllEmployee();
        $data['key'] = $result->key_insert;

        if(!empty($key)){

            if($key == $data['key']){

                $hashMd5 = $this->user_model->getMd5Location();

                $data = [
                    'message' => 'success',
                    'data' => $hashMd5
                ];
                $this->response($data, REST_Controller::HTTP_OK);

            }else{
                $this->response(["message" => "Your key is wrong"], REST_Controller::HTTP_OK);
            }
        }else{
            $this->response(["message" => "Please insert your key first!"], REST_Controller::HTTP_OK);
        }
    }

    public function storeLocation_post()
    {

        $lat = $this->input->post('lat');
        $longt = $this->input->post('longt');

        $post = $this->input->post(NULL, TRUE);
        $cleanPost['lat'] = $lat;
        $cleanPost['longt'] = $longt;

        $store = $this->user_model->insertLocation($cleanPost);

        $data = [
            'message' => 'success',
        ];

        $this->response($data, REST_Controller::HTTP_OK);
    }

    public function deleteLocationTable_post()
    {
        $store = $this->user_model->deleteTableLocation();
    }

    public function showAllDataLocation_get()
    {
        $data = $this->user_model->getLocationArea();
        $this->response($data, REST_Controller::HTTP_OK);
    }

    public function storeMd5Location_post()
    {
        $md5 = $this->input->post('md5');
        $hashMd5 = md5($md5);

        $post = $this->input->post(NULL, TRUE);
        $cleanPost['md5'] = $hashMd5;
        $store = $this->user_model->insertMd5($cleanPost);
    }

    public function absent_attendance_post()
    {
        if ($this->input->server('REQUEST_METHOD') == 'POST') {

            $key = $this->input->post('key');

            $result = $this->user_model->getAllEmployee();
            $data['many_employee'] = $result->many_employee;
            $data['start'] = $result->start_time;
            $data['out'] = $result->out_time;
            $data['key'] = $result->key_insert;
            if(!empty($key)){
                if($key == $data['key']){

                    $Q = $this->security->xss_clean($this->input->post('q', TRUE));
                    $name = $this->security->xss_clean($this->input->post('name', TRUE));
                    $date = $this->security->xss_clean($this->input->post('date', TRUE));
                    $location = $this->security->xss_clean($this->input->post('location', TRUE));

                    //Get time function
                    function gettime ($total){
                        $hours = intval($total / 3600);
                        $seconds_remain = ($total - ($hours * 3600));
                        $minutes = intval($seconds_remain / 60);
                        $seconds = ($seconds_remain - ($minutes * 60));
                        return array($hours,$minutes,$seconds);
                    }

                    //check command
                    if($Q == "in"){

                        $in_time = $this->security->xss_clean($this->input->post('in_time', TRUE));
                        $change_in_time = strtotime($in_time);

                        //Get late time
                        $get_late_time = gettime($change_in_time - strtotime($data['start']));
                        $late_time = "$get_late_time[0]:$get_late_time[1]:$get_late_time[2]";

                        $alldata = array(
                            'name' => $name,
                            'date' => $date,
                            'in_location' => $location,
                            'in_time' => $in_time,
                            'late_time' => $late_time
                        );

                        $go = $this->user_model->insertAbsent($alldata);
                        if($go == true){
                            echo "Success!";
                        }else{
                            echo "Error! Something Went Wrong!";
                        }
                    }else if($Q == "out"){

                        $out_time = $this->security->xss_clean($this->input->post('out_time', TRUE));
                        $change_out_time = strtotime($out_time);

                        //open in_time from database
                        $datain['in_time'] = $this->user_model->getDataAbsent("name", $name, "date", $date);
                        $get_in_database = strtotime($datain['in_time']);

                        //Get work hour
                        $get_work_hour = gettime($change_out_time - $get_in_database);
                        $work_hour = "$get_work_hour[0]:$get_work_hour[1]:$get_work_hour[2]";

                         //Get over time
                        $get_over_time = gettime($change_out_time - strtotime($data['out']));
                        if($change_out_time < strtotime($data['out']))
                            $over_time = "00:00:00";
                        else
                            $over_time = "$get_over_time[0]:$get_over_time[1]:$get_over_time[2]";

                        //Early out time
                        $get_early_out_time = gettime(strtotime($data['out']) - $change_out_time);
                        $early_out_time = "$get_early_out_time[0]:$get_early_out_time[1]:$get_early_out_time[2]";

                        //do SQL
                        $alldata = array(
                            'name' => $name,
                            'date' => $date,
                            'out_location' => $location,
                            'out_time' => $out_time,
                            'work_hour' => $work_hour,
                            'over_time' => $over_time,
                            'early_out_time' => $early_out_time
                        );

                        $go = $this->user_model->updateAbsent($alldata);
                        if($go == true){
                            echo "Success!";
                        }else{
                            echo "Error! Something Went Wrong!";
                        }
                    }else{
                        echo 'Error! Wrong Command!';
                    }
                }else{
                    echo "The KEY is Wrong!";
                }
            }else{
                echo "Please Setting KEY First!";
            }

        }else{
            echo "You can't access this page!";
        }
    }
}