import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { GenericTable } from './GenericTable';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class SpaceStack extends Stack {
  private api : RestApi = new RestApi(this, 'SpaceApi')
  private spacesTable: GenericTable = new GenericTable(
    'SpacesTable',
    'spaceId',
    this
  )

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props)

    const helloLambda = new LambdaFunction(this, 'helloLambda', {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(join(__dirname, '..', 'services', 'hello')),
      handler: 'hello.main'
    })

    const helloLambdaNodeJs = new NodejsFunction(this, 'helloLambdaNodeJs', {
      entry: (join(__dirname, '..', 'services', 'node-lambda', 'hello.ts')),
      handler: 'handler'
    })

    // Hello Lambda integration
    const helloLambdaIntegration = new LambdaIntegration(helloLambda)
    const helloLambdaResource = this.api.root.addResource('hello')
    helloLambdaResource.addMethod('GET', helloLambdaIntegration)
  }

}