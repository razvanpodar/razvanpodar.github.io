import * as THREE from "three";

class Planet extends THREE.Mesh
{
    constructor(position, scale, material, hoverMaterial)
    {
        // super(new THREE.RingGeometry(0.9, 1, 100, 20), material);
        // super(new THREE.CircleGeometry(1, 32), material);
        super(new THREE.SphereGeometry(1, 20, 20), material);

        this.defaultMaterial = material;
        this.hoverMaterial = hoverMaterial;
        let scalar = scale * 1.15;
        this.hoverScale = new THREE.Vector3(1, 1, 1).multiplyScalar(scalar);
        this.defaultScale = new THREE.Vector3(1, 1, 1).multiplyScalar(scale);
        this.position.copy(position);
        this.scale.set(scale, scale, scale);
    }

    checkHover(mousePosition)
    {
        var isHover = false;

        var lowX = (this.position.x / 2) - (this.scale.x / 2);
        var highX = (this.position.x / 2) + (this.scale.x / 2) - 1;
    
        var lowY = (this.position.y / 2) - (this.scale.x / 2);
        var highY = (this.position.y / 2) + (this.scale.x / 2) - 1;
    
        if ((mousePosition.x > lowX) && (mousePosition.x < highX) &&
            (mousePosition.y > lowY) && (mousePosition.y < highY))
        {
            // this.material = this.hoverMaterial;
            isHover = true;
            this.scale.copy(this.hoverScale);
        }
        else
        {
            isHover = false;
            // this.material = this.defaultMaterial;
            this.scale.copy(this.defaultScale);
        }

        return isHover;
    }
};

export { Planet };
