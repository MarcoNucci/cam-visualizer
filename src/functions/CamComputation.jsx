
export const computeCamSegmentParameters = (point1, point2) => {

    let x1 = parseFloat(point1.x);
    let x2 = parseFloat(point2.x);
    let y1 = parseFloat(point1.y);
    let y2 = parseFloat(point2.y);
    let v1 = parseFloat(point1.v);
    let v2 = parseFloat(point2.v);
    let a1 = parseFloat(point1.a);
    let a2 = parseFloat(point2.a);

    if (point2.type == "Straight")
    {
      return [(x2 * y1 - x1*y2)/(x2 - x1) ,(y2 - y1)/(x2 - x1),0,0,0,0]
    }

    if (point2.type == "Poly5")
    {
      var matrix = [[(Math.pow(x2,3)*(10*Math.pow(x1,2)-5*x2*x1+Math.pow(x2,2)))   	/(Math.pow(x2-x1,5)),
                  (x1*(4*x1-x2)*Math.pow(x2,3)) 							/(Math.pow(x1-x2,4)),
                  -(Math.pow(x1,2)*Math.pow(x2,3))									/(2*Math.pow(x1-x2,3)),
                  (Math.pow(x1,3)*(Math.pow(x1,2)-5*x2*x1+10*Math.pow(x2,2)))	/(Math.pow(x1-x2,5)),
                  -(Math.pow(x1,3)*(x1-4*x2)*x2) 							/(Math.pow(x1-x2,4)),
                  (Math.pow(x1,3)*Math.pow(x2,2))									/(2*Math.pow(x1-x2,3))],

                  [(30*Math.pow(x1,2)*Math.pow(x2,2))								/(Math.pow(x1-x2,5)),
                  (Math.pow(x2,2)*(-12*Math.pow(x1,2)-4*x1*x2+Math.pow(x2,2)))	/(Math.pow(x1-x2,4)),
                  (x1*Math.pow(x2,2)*(3*x1 + 2*x2))						/(2*Math.pow(x1-x2,3)),
                  -(30*Math.pow(x1,2)*Math.pow(x2,2))								/(Math.pow(x1-x2,5)),
                  (Math.pow(x1,2)*(Math.pow(x1,2)-4*x1*x2-12*Math.pow(x2,2)))	/(Math.pow(x1-x2,4)), 
                  -(Math.pow(x1,2)*x2*(2*x1+3*x2))									/(2*Math.pow(x1-x2,3))],

                  [-(30*x1*x2*(x1+x2))									/(Math.pow(x1-x2,5)),
                  (6*x1*x2*(2*x1+3*x2))								/(Math.pow(x1-x2,4)),
                  (x2*(3*Math.pow(x1,2)+6*x2*x1+Math.pow(x2,2)))				/(2*Math.pow(x2-x1,3)),
                  (30*x1*x2*(x1+x2))									/(Math.pow(x1-x2,5)),
                  (6*x1*x2*(3*x1+2*x2))								/(Math.pow(x1-x2,4)),	
                  (x1*(Math.pow(x1,2)+6*x2*x1+3*Math.pow(x2,2)))				/(2*Math.pow(x1-x2,3))],

                  [(10*(Math.pow(x1,2)+4*x2*x1+Math.pow(x2,2)))					/(Math.pow(x1-x2,5)),
                  -(2*(2*Math.pow(x1,2)+10*x2*x1+3*Math.pow(x2,2)))			/(Math.pow(x1-x2,4)),
                  (Math.pow(x1,2)+6*x2*x1+3*Math.pow(x2,2))					/(2*Math.pow(x1-x2,3)),
                  -(10*(Math.pow(x1,2)+4*x2*x1+Math.pow(x2,2)))				/(Math.pow(x1-x2,5)),
                  -(2*(3*Math.pow(x1,2)+10*x2*x1+2*Math.pow(x2,2)))			/(Math.pow(x1-x2,4)),
                  -(3*Math.pow(x1,2)+6*x2*x1+Math.pow(x2,2))					/(2*Math.pow(x1-x2,3))],

                  [-(15*(x1+x2))											/(Math.pow(x1-x2,5)),
                  (7*x1+8*x2)												/(Math.pow(x1-x2,4)),
                  -(2*x1+3*x2) 											/(2*Math.pow(x1-x2,3)),
                  (15*(x1+x2)) 											/(Math.pow(x1-x2,5)),
                  (8*x1+7*x2)  											/(Math.pow(x1-x2,4)),
                  (3*x1 + 2*x2)											/(2*Math.pow(x1-x2,3))],
                                                                            
                  [6 															/(Math.pow(x1-x2,5)),
                  -3           												/(Math.pow(x1-x2,4)),
                  1            												/(2*Math.pow(x1-x2,3)),
                  -6           												/(Math.pow(x1-x2,5)),
                  -3           												/(Math.pow(x1-x2,4)),
                  -1           												/(2*Math.pow(x1-x2,3))]];
                
      var vector = [y1, v1, a1, y2, v2, a2]

      var result = [0,0,0,0,0,0];
      for (var i=0; i<6; i++)
      {
        for (var j=0; j<6;j++)
        {
          result[i] += matrix[i][j]*vector[j];
        }
      }
      // console.log(point1);
      // console.log(point2);
      // console.log(vector);
      // console.log(matrix);
      // console.log(result);
      return result;
    }
  }

  export const computeCamPosition = (x, camSegmentParameters) => {
    let result = 0;
    for (var i = 0; i < 6; i++)
    {
        result += camSegmentParameters[i]*Math.pow(x,i);
    }
    return result;
}

export const computeCamVelocity = (x, camSegmentParameters) => {
    let result = 0;
    for (var i = 1; i < 6; i++)
    {
        result += i*camSegmentParameters[i]*Math.pow(x,i-1);
    }
    return result;
}
export const computeCamAcceleration = (x, camSegmentParameters) => {
    let result = 0;
    for (var i = 2; i < 6; i++)
    {
        result += i*(i-1)*camSegmentParameters[i]*Math.pow(x,i-2);
    }
    return result;
}

export const solveZeroVelocity = (xMin, xMax, steps, camSegmentParameters) => 
{
  let step = (xMax - xMin)/steps;
  let previousVel = undefined;
  let vel = undefined;
  for (let x = xMin; x<xMax; x+=step)
  {
    vel = computeCamVelocity(x, camSegmentParameters);
    
    if (previousVel != undefined)
      if (vel * previousVel < 0)
        return true;

    previousVel = vel;
  }
  return false;
}

export const computePosition = (x, camPoints, camParameters) => 
{
    if (x > camPoints[camPoints.length - 1].x)
        x = x % (camPoints[camPoints.length - 1].x - camPoints[0].x) + camPoints[0].x;

    for (let i = 0; i < camPoints.length - 1; i++)
        if (x >= camPoints[i].x && x <= camPoints[i+1].x)
            return computeCamPosition(x,camParameters[i])

}


// export const solveQuarticEquation = (a0,b0,c0,d0,e0) => 
// {
//   let a = b0/a0
//   let b = c0/a0
//   let c = d0/a0
//   let d = e0/a0

//   a0 = 0.25*a
//   let a02 = a0*a0

//   let p = 3*a02 - 0.5*b
//   let q = a*a02 - b*a0 + 0.5*c
//   let r = 3*a02*a02 - b*a02 + c*a0 - d

//   let z0 = solveCubicEquation(1, p, r, p*r - 0.5*q*q)

//   let s = Math.sqrt(2*p + 2*z0)
//   let t = 0
//   if (s == 0)
//       t = z0*z0 + r
//   else
//       t = -q / s

//   r0, r1 = solveQuadraticEquation(1, s, z0 + t)
//   r2, r3 = solveQuadraticEquation(1, -s, z0 - t)

//   return r0 - a0, r1 - a0, r2 - a0, r3 - a0
// }


// export const solveCubicEquation = (a0, b0, c0, d0) =>
// {
//   let third = 1./3.
//   let a13 = a*third
//   let a2 = a13*a13

//   let f = third*b - a2
//   let g = a13 * (2*a2 - b) + c
//   let h = 0.25*g*g + f*f*f
//   if (f == g == h == 0)
//     return -Math.cbrt(c)

//   else if (h <= 0)
//   {
//     let j = Math.sqrt(-f)
//     let k = math.acos(-0.5*g / (j*j*j))
//     let m = math.cos(third*k)
//     return 2*j*m - a13
//   }
//   else
//   {
//     let sqrt_h = Math.sqrt(h)
//     let S = Math.cbrt(-0.5*g + sqrt_h)
//     let U = Math.cbrt(-0.5*g - sqrt_h)
//     let S_plus_U = S + U
//     return S_plus_U - a13
//   }
// }

// export const solveQuadraticEquation = (a0,b0,c0) =>
// {
//   let a = b0 / a0;
//   let b = c0 / a0;

//   a0 = -0.5*a;
//   let delta = a0*a0 - b;
//   let sqrt_delta = Math.sqrt(delta);

//   let r1 = a0 - sqrt_delta;
//   let r2 = a0 + sqrt_delta;

//   return r1, r2;
// }



// deltaX > (deltaY * Cv)/(deltaM)