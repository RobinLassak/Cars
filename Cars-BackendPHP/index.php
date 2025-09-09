<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Content-Type: application/json; charset=utf-8");

    include('./dbConnect.php');
    $connection = new DbConnect();
    $database = $connection->connect();

    $method = $_SERVER['REQUEST_METHOD'];

    switch($method) {
        case 'GET': 
            // http://localhost/cvicne/Cars-Backend-2025/?action=getAll
            $action = $_GET['action'];
            if ($action === 'getAll') {
                $sql = "SELECT * FROM DatabazeAut";
                $stmt = $database->prepare($sql);
                $stmt->execute();
                $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($cars, JSON_UNESCAPED_UNICODE);
            } else if ($action === 'getSpec') {
                // http://localhost/cvicne/Cars-Backend-2025/?action=getSpec&ids=1,2,4
                $idsParam = isset($_GET['ids']) ? $_GET['ids'] : '';
                $ids = explode(',', $idsParam);
                $ids = array_filter($ids, function($value) {
                    return $value !== '';
                });
                $ids = implode(',', array_map('intval', $ids));
                if (!empty($ids)) {
                    $sql = "SELECT * FROM DatabazeAut WHERE id IN ($ids)";
                    $stmt = $database->prepare($sql);
                    $stmt->execute();
                    $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    echo json_encode($cars, JSON_UNESCAPED_UNICODE);
                }
            } else {
                echo json_encode([]);
            }
        break;
        case 'POST':
            $car = json_decode(file_get_contents('php://input'));
            $sql = "INSERT INTO DatabazeAut(brand,model,reg,km,year) VALUES(:brand,:model,:reg,:km,:year)";
            $stmt = $database->prepare($sql);
            $stmt->bindParam(':brand', $car->brand);
            $stmt->bindParam(':model', $car->model);
            $stmt->bindParam(':reg', $car->reg);
            $stmt->bindParam(':km', $car->km);
            $stmt->bindParam(':year', $car->year);
            if ($stmt->execute()) {
                $data = ['status' => 1, 'message' => "Car added"];
              } else {
                $data = ['status' => 0, 'message' => "Failed to add car."];
            }
            echo json_encode($data);
            break;
        case 'PUT':
            $car = json_decode(file_get_contents('php://input'));
            $sql = "UPDATE DatabazeAut SET brand = :brand, model = :model, reg = :reg, km = :km, year = :year WHERE id = :id";
            $stmt = $database->prepare($sql);
            $stmt->bindParam(':brand', $car->brand);
            $stmt->bindParam(':model', $car->model);
            $stmt->bindParam(':reg', $car->reg);
            $stmt->bindParam(':km', $car->km);
            $stmt->bindParam(':year', $car->year);
            $stmt->bindParam(':id', $car->id);
            if ($stmt->execute()) {
                $data = ['status' => 1, 'message' => "Car updated"];
              } else {
                $data = ['status' => 0, 'message' => "Failed to update."];
            }
            echo json_encode($data);
            break;
            case 'DELETE':
                $requestPath = $_SERVER['REQUEST_URI'];
                $pathSegments = explode('/', trim($requestPath, '/'));
                $carId = (int) $pathSegments[count($pathSegments) - 1];
                if ($carId > 0) {
                    $sql = "DELETE FROM DatabazeAut WHERE id= :id";
                    $stmt = $database->prepare($sql);
                    $stmt->bindParam(':id', $carId, PDO::PARAM_INT);
                    if ($stmt->execute()) {
                        $data = ['status' => 1, 'message' => "Car deleted"];
                      } else {
                        $data = ['status' => 0, 'message' => "Failed to delete car."];
                    }
                } else {
                    $data = ['status' => 0, 'message' => "Id not numeric."];
                } 
                echo json_encode($data);
            break;
                        
        default:
            break;
    }
?>